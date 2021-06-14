import React from 'react'
import { registerRootComponent } from 'expo'
import { RootSiblingParent } from 'react-native-root-siblings'

import App from './App'

const AppContainer = () => (
  <RootSiblingParent>
    <App />
  </RootSiblingParent>
)

export default registerRootComponent(AppContainer)
