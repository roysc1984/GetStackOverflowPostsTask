import { observer } from 'mobx-react'
import React, { FC} from 'react'
import { StyleSheet, Text} from 'react-native'
import { useStores } from '../Stores/StoreContext'

interface Props {
  style?: any
  children?: string
}

const TextMode: FC<Props> = ({ children, style })  => {
  const { appStore } = useStores()
  return (<Text style={[appStore?.lightMode ? styles.colorTextLight :  styles.colorTextDark, style]}>{children}</Text>)
}

export default observer(TextMode)

const styles = StyleSheet.create({
  colorTextLight: {
    color: '#000000'
  },
  colorTextDark: {
    color: '#fff'
  }
})