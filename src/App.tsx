import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Toast from 'react-native-root-toast'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

import { ACECOM_WD } from '@env'
import { ImageUri } from './interfaces'
import { toastOptions } from './utils'

const classes = StyleSheet.create({
  button: {
    backgroundColor: '#7952b3',
    marginTop: 20,
    padding: 7
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#222',
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    height: 200,
    marginTop: 20,
    resizeMode: 'contain',
    width: 200
  },
  title: {
    color: '#fff',
    fontSize: 25
  }
})

const App = () => {
  const [borderRadius, setBorderRadius] = React.useState(100)
  const [selectedImage, setSelectedImage] = React.useState<ImageUri>({
    uri: null
  })

  const openImagePicker = React.useCallback(async (): Promise<void> => {
    try {
      const libraryPermissionResults =
        await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (!libraryPermissionResults.granted) {
        Toast.show('Ok! See yo!', toastOptions())

        return
      }

      const imageResult = await ImagePicker.launchImageLibraryAsync()

      if (imageResult.cancelled) {
        Toast.show('Oh! You didn\'t pick any image!', toastOptions())

        return
      }

      setSelectedImage({ uri: imageResult.uri })
      setBorderRadius(Math.round((imageResult.height + imageResult.width) / 2))
    } catch (error) {
      Toast.show('Ups! Something went wrong :(', toastOptions())
    }
  }, [])

  const openShareDialog = async () => {
    try {
      const isSharingAvailable = await Sharing.isAvailableAsync()

      if (!isSharingAvailable) {
        Toast.show('Sharing is not available on your platform!', toastOptions())

        return
      }

      if (selectedImage.uri) await Sharing.shareAsync(selectedImage.uri)
      else Toast.show('Hey! You have to pick an image!', toastOptions())
    } catch (error) {
      Toast.show('Something went wrong, please try again', toastOptions())
    }
  }

  const getImageUri = (): string => {
    if (selectedImage.uri) return selectedImage.uri

    return ACECOM_WD
  }

  return (
    <View style={classes.container}>
      <Text style={classes.title}>ACECOM WD &lt;3!</Text>
      <Text style={classes.title}>Pick an image!</Text>
      <TouchableOpacity onPress={openImagePicker}>
        <Image
          source={{ uri: getImageUri() }}
          style={{
            ...classes.image,
            borderRadius
          }}
        />
      </TouchableOpacity>
      {selectedImage.uri ? (
        <TouchableOpacity onPress={openShareDialog} style={classes.button}>
          <Text>Share this image</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  )
}

export default App
