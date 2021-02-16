import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, View, Switch, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import FilterQuestion from '../Components/FilterQuestion'
import QuestionCards from '../Components/QuestionCards'
import UserDetails from '../Components/UserDetails'
import { Icon } from 'react-native-elements'
import QuestionModal from '../Components/QuestionModal'
import { WebView } from 'react-native-webview'
import Spinner from '../Components/Spinner'
import { observer } from 'mobx-react'
import { useStores } from '../Stores/StoreContext'
import { QuestionsItem } from '../Stores/AppStore'
import TextMode from '../Components/TextMode'

const StackOverflow: FC = () => {
  const [isEnabledLightMode, setIsEnabledLightMode] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')
  const [userIdBlur, setUserIdBlur] = useState<boolean>(false)
  const [webViewSpinner, setwebViewSpinner] = useState<boolean>(true)
  const [selectedSort, setselectedSort] = useState<number>(0)
  const [selectedCard, setCelectedCard] = useState<QuestionsItem| undefined>(undefined)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { appStore } = useStores()

  const toggleSwitch = () => {
    appStore?.setLightMode(!isEnabledLightMode)
    setIsEnabledLightMode(prev => !prev)
  }

  const onPressCard = (item: QuestionsItem) => {
    setModalOpen(true)
    setCelectedCard(item)
  }

  const closeModal = () => {
    setModalOpen(false)
  }
  const SearchUser = () => {
    setUserIdBlur(prev => !prev)
  }

  const clearUserId = () => {
    setUserId('')
    appStore.setPostQuestions({})
  }

  useEffect(() => {
    userId ? appStore?.gePostQuestions(userId) : appStore.setPostQuestions({})  
  }, [userIdBlur])

  return (
    <View style={isEnabledLightMode ? [styles.container ,styles.bgColorLight] : [styles.container, styles.bgColorDark]}>
      <QuestionModal
       isOpen={modalOpen}
       closeModal={closeModal}
      >
        <WebView 
          onLoad={() => setwebViewSpinner(false)}
          style={styles.flexOneContainer} 
          source={{ uri: selectedCard?.link || ''}} 
        />
        {<Spinner isLoading={webViewSpinner} />}
      </QuestionModal>
      <View style={styles.switchContainer}>
        <View style={styles.switch}>
          <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabledLightMode ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabledLightMode}
          />
          <TextMode>{isEnabledLightMode ? 'Light mode' : 'Dark mode'}</TextMode>
        </View>
      </View>
      <TextMode style={styles.title}>{'Get Stack Overflow posts'}</TextMode>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={isEnabledLightMode ? [styles.userIdInput, styles.colorTextLight] : [styles.userIdInput, styles.colorTextDark]}
          onChangeText={text => setUserId(text)}
          value={userId}
          placeholder={'user Id'}
          placeholderTextColor={'#a6a6a6'}
          onBlur={SearchUser}
        />
        <TouchableOpacity
          onPress={() => clearUserId()}
        >
          <Icon
            type='material-community'
            name='close-circle-outline' 
            color={'#a6a6a6'}
            size={18}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.flexOneContainer}>
        <Spinner isLoading={appStore?.loading} />
        {appStore?.questionsitems && appStore?.totalQuestionsitems === 0 &&
          <TextMode style={styles.title}>{'No data found'}</TextMode>
        }
        {appStore?.totalQuestionsitems > 0 && (
          <View style={styles.flexOneContainer}>
            <UserDetails />
            <FilterQuestion selectedSort={selectedSort} setselectedSort={setselectedSort} />
            <QuestionCards selectedSort={selectedSort} onItemPress={onPressCard} />
            <View style={isEnabledLightMode ? [styles.totalQuestions, styles.bgColorLight] : [styles.totalQuestions, styles.bgColorDark]}>
              <TextMode>{`Total of ${appStore?.totalQuestionsitems} questions found`}</TextMode>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

export default observer(StackOverflow)

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  switch: {
    alignItems: 'center'
  },
  switchContainer: {
    alignItems: 'flex-end',
    marginTop: 30,
    marginHorizontal: 15
  },
  userIdInput:{
    height: 40,
    borderBottomColor: '#a6a6a6', 
    borderBottomWidth: 1,
    width: '50%',
    marginVertical: 20
  },
  colorTextLight: {
    color: '#000000'
  },
  colorTextDark: {
    color: '#fff'
  },
  bgColorLight: {
    backgroundColor: '#fff',
  },
  bgColorDark: {
    backgroundColor: '#000000'
  },
  totalQuestions : {
    marginHorizontal: 10,
    paddingBottom: 10
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexOneContainer: {
    flex: 1
  }
})