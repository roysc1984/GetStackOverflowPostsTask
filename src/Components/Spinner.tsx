import React, { FC } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

interface Props {
  isLoading?: boolean
}

const Spinner: FC<Props> = ({ isLoading }) => (
  isLoading ?
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={'gray'} />
    </View> : null
)

export default Spinner

const styles = StyleSheet.create({
  loading: {
    ...StyleSheet.absoluteFill as {},
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  }
})