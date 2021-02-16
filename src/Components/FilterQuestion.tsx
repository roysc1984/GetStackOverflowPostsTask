import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { SORT_OPTION } from '../Stores/AppStore'
import TextMode from './TextMode'

interface Props {
  selectedSort: SORT_OPTION
  setselectedSort: React.Dispatch<React.SetStateAction<number>>
}

const FilterQuestion: FC<Props> = ({selectedSort, setselectedSort }) => {
  return (
    <View style={styles.container}>
      <TextMode>{'Questions'}</TextMode>
      <SegmentedControlTab
        values={['date', 'answers', 'views']}
        selectedIndex={selectedSort}
        onTabPress={setselectedSort}
        tabsContainerStyle={styles.tabsContainerStyle}
      />
    </View>
  )
}

export default FilterQuestion

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  tabsContainerStyle: {
    width: '52%',
    height: 25
  }
})