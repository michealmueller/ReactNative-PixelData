import { render, screen, fireEvent, act } from '@testing-library/react-native'
import { ImagePickerComponent } from '../components/ImagePicker'
import * as ImagePickerModule from 'expo-image-picker'

// Mock expo-image-picker
jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  MediaTypeOptions: {
    Images: 'images'
  }
}))

describe('ImagePicker', () => {
  const mockOnImageSelected = jest.fn()
  const mockOnError = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    // Default to granted permissions
    ;(ImagePickerModule.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
      granted: true,
    })
  })

  it('should render pick image button', () => {
    render(
      <ImagePickerComponent
        onImageSelected={mockOnImageSelected}
        onError={mockOnError}
      />
    )
    expect(screen.getByText('Pick an image')).toBeTruthy()
  })

  it('should handle permission denied', async () => {
    (ImagePickerModule.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
      granted: false,
    })

    render(
      <ImagePickerComponent
        onImageSelected={mockOnImageSelected}
        onError={mockOnError}
      />
    )

    await act(async () => {
      await fireEvent.press(screen.getByText('Pick an image'))
    })
    expect(mockOnError).toHaveBeenCalledWith(new Error('Permission to access media library was denied'))
  })

  it('should handle successful image selection', async () => {
    const mockImage = {
      canceled: false,
      assets: [{
        uri: 'test-uri',
        width: 100,
        height: 100,
      }]
    }
    ;(ImagePickerModule.launchImageLibraryAsync as jest.Mock).mockResolvedValue(mockImage)

    render(
      <ImagePickerComponent
        onImageSelected={mockOnImageSelected}
        onError={mockOnError}
      />
    )

    await act(async () => {
      await fireEvent.press(screen.getByText('Pick an image'))
    })
    expect(mockOnImageSelected).toHaveBeenCalledWith(mockImage)
  })

  it('should handle image picker cancellation', async () => {
    const mockCancelledResult = {
      canceled: true,
      assets: null
    }
    ;(ImagePickerModule.launchImageLibraryAsync as jest.Mock).mockResolvedValue(mockCancelledResult)

    render(
      <ImagePickerComponent
        onImageSelected={mockOnImageSelected}
        onError={mockOnError}
      />
    )

    await act(async () => {
      await fireEvent.press(screen.getByText('Pick an image'))
    })
    expect(mockOnImageSelected).not.toHaveBeenCalled()
    expect(mockOnError).not.toHaveBeenCalled()
  })

  it('should handle image picker error', async () => {
    const error = new Error('Test error')
    ;(ImagePickerModule.launchImageLibraryAsync as jest.Mock).mockRejectedValue(error)

    render(
      <ImagePickerComponent
        onImageSelected={mockOnImageSelected}
        onError={mockOnError}
      />
    )

    await act(async () => {
      await fireEvent.press(screen.getByText('Pick an image'))
    })
    expect(mockOnError).toHaveBeenCalledWith(error)
  })
}) 