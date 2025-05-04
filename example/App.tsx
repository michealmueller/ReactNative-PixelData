import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { Asset } from 'expo-asset'
import Expo2DContext from 'expo-2d-context'
import { getPixelData } from '@rosievision/pixel-data'
import * as ImagePicker from 'expo-image-picker'

export default function App() {
  const [pixelData, setPixelData] = useState<Uint8ClampedArray | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImagePick = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        setError('Permission to access media library was denied')
        return
      }

      // Pick an image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      if (!result.canceled && result.assets[0]) {
        // Create a context
        const context = new Expo2DContext(1, {
          maxGradStops: 10,
          renderWithOffscreenBuffer: false,
          fastFillTesselation: false
        })

        // Create an asset from the selected image
        const asset = Asset.fromURI(result.assets[0].uri)
        await asset.downloadAsync()

        // Get pixel data
        const data = await getPixelData({
          expo2dContext: context,
          source: {
            asset,
            width: result.assets[0].width || 100,
            height: result.assets[0].height || 100
          }
        })

        setPixelData(data.data)
        setError(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setPixelData(null)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pixel Data Example</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {pixelData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            First pixel RGBA: [{pixelData[0]}, {pixelData[1]}, {pixelData[2]}, {pixelData[3]}]
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#FF3B30',
    marginBottom: 20,
  },
  resultContainer: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  resultText: {
    fontSize: 16,
  },
}) 