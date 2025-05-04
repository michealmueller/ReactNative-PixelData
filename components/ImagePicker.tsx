import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import * as ImagePickerModule from 'expo-image-picker'
import { ThemedText } from './ThemedText'

interface ImagePickerProps {
  onImageSelected: (image: ImagePickerModule.ImagePickerResult) => void
  onError: (error: Error) => void
}

export const ImagePickerComponent: React.FC<ImagePickerProps> = ({ onImageSelected, onError }) => {
  const handlePickImage = async () => {
    try {
      const { status } = await ImagePickerModule.requestMediaLibraryPermissionsAsync()
      
      if (status !== 'granted') {
        throw new Error('Permission to access media library was denied')
      }

      const result = await ImagePickerModule.launchImageLibraryAsync({
        mediaTypes: ImagePickerModule.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled) {
        onImageSelected(result)
      }
    } catch (error) {
      if (error instanceof Error) {
        onError(error)
      } else {
        onError(new Error('Failed to pick image'))
      }
    }
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handlePickImage}>
      <ThemedText type="default">Pick an image</ThemedText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
}) 