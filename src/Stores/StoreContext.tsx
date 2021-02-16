import React from 'react'
import { AppStore } from './AppStore'

const appStore = new AppStore()
const storesContext = React.createContext({appStore: appStore})

export const useStores = () => React.useContext(storesContext)