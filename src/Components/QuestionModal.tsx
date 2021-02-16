import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

interface Props {
  isOpen: boolean
  children: any
  closeModal: () => void
}

const QuestionModal: FC<Props> = ({isOpen, children, closeModal}) => (
  <Modal
    animationIn='slideInUp'
    isVisible={isOpen}
    style={styles.modalMargin}
    onBackdropPress={closeModal}
    onBackButtonPress={closeModal}
  >
    <View style={styles.modalContainer}>
      {children}
    </View>
  </Modal>
)

export default QuestionModal

const styles = StyleSheet.create({
  modalMargin: {
    margin: 0
  },
  modalContainer: {
      backgroundColor : 'white',
      width : '90%',
      height : '80%',
      alignSelf: 'center'
  }
})