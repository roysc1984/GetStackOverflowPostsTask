import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import StackOverflow from './src/Screens/StackOverflowPosts'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StackOverflow />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
