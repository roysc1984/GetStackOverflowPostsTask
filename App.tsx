import React from 'react'
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import StackOverflow from './src/Screens/StackOverflowPosts'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
     <StatusBar backgroundColor={'gray'} barStyle="light-content" />
      <StackOverflow />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
