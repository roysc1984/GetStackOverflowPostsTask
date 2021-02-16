import { observer } from 'mobx-react'
import React, { FC } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { useStores } from '../Stores/StoreContext'
import TextMode from './TextMode'

const UserDetails: FC= () => {
  const { appStore } = useStores()
 
  return (
    <View style={styles.container}>
      {appStore.getOwnerAvatar?.profile_image && <Image resizeMode='contain' style={styles.avatar} source={{uri: appStore.getOwnerAvatar?.profile_image}} />}
      <View style={styles.containerInfo}>
        <TextMode>{`Name: ${appStore.getOwnerAvatar?.display_name || ''}`}</TextMode>
        <TextMode>{`Reputation: ${appStore.getOwnerAvatar?.reputation || ''}`}</TextMode>
        <TextMode>{`Accept Rate:  ${appStore.getOwnerAvatar?.accept_rate || ''}`}</TextMode>
      </View>
    </View>
  )
}

export default observer(UserDetails)

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatar: {
      height: 100,
      width: 100,
      borderRadius: 20
  },
  containerInfo: {
    height: 100,
    marginHorizontal: 15,
    justifyContent: 'space-evenly'
  }
})