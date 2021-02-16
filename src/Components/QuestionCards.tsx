import { observer } from 'mobx-react'
import React, { FC, useMemo } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { QuestionsItem, SORT_OPTION } from '../Stores/AppStore'
import { useStores } from '../Stores/StoreContext'
import TextMode from './TextMode'

interface Props {
  onItemPress: (item: QuestionsItem) => void
  selectedSort: SORT_OPTION
}

const QuestionCards: FC<Props> = ({ onItemPress, selectedSort }) => {
  const { appStore } = useStores()

  const sortedQuestionsBytype = useMemo(() => {
    switch (selectedSort) {
      case SORT_OPTION.DATE:
        return appStore.getSortQuestionsitemsDate!
      case SORT_OPTION.ANSWERS:
        return appStore.getSortQuestionsitemsAnswers!
      case SORT_OPTION.VIEWS:
        return appStore.getSortQuestionsitemsViews!
    }
  },[selectedSort])

  const renderCard = ({ item }: { item: QuestionsItem }) => {
    return (
    <TouchableOpacity onPress={() => onItemPress(item)}>
      <View style={styles.card}>
        <TextMode>{item.title}</TextMode>
      </View>
    </TouchableOpacity>)
  }

  const keyExtractor = (item: QuestionsItem, index: number) => `${item.question_id || index}`

  return (
    <View  style={[styles.listContentStyle]}>
      <View style={styles.listContainer}>
        <FlatList
          data={sortedQuestionsBytype}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderCard}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListHeaderComponent={ <View style={styles.divider} />}
          ListFooterComponent={<View style={styles.divider} />}
        />
      </View>
    </View>
  )
}

export default observer(QuestionCards)

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 10,
    flex: 1
  },
  listContentStyle: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 2
  },
  card: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    justifyContent: 'center'
  },
  divider: {
    backgroundColor: '#a6a6a6',
    height: 1
  }
})