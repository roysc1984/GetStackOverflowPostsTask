import { observer } from 'mobx-react'
import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Owner } from '../Stores/AppStore'
import { useStores } from '../Stores/StoreContext'
import TextMode from './TextMode'

const UserDetails: FC= () => {
  const { appStore } = useStores()
  const [owner, setOwner] = useState<Owner | undefined>(undefined)
  
  useEffect(() => {
    setOwner(appStore.getOwnerAvatar)
  }, [appStore.postQuestions])

  return (
    <View style={styles.container}>
      {owner?.profile_image && <Image resizeMode='contain' style={styles.avatar} source={{uri: owner?.profile_image}} />}
      <View style={styles.containerInfo}>
        <TextMode>{`Name: ${owner?.display_name || ''}`}</TextMode>
        <TextMode>{`Reputation: ${owner?.reputation || ''}`}</TextMode>
        <TextMode>{`Accept Rate:  ${owner?.accept_rate || ''}`}</TextMode>
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