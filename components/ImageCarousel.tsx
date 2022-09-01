import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import {WIDTH} from '../constance'

const ImageCarousel = ({images}:{images: string[]}) => {
    const viewConfig = {viewAreaCoveragePercentThreshold: 95}
    const flatListRef = useRef<FlatList | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const onViewRef = useRef(({changed}: {changed: any}) => {
      if (changed[0].isViewable) {
        setActiveIndex(changed[0].index)
      }
    })

    //  Gallery Handler Handlers
    const handlePressLeft = () => {
      if (activeIndex === 0)
      return flatListRef.current?.scrollToIndex({
        animated: false,
        index: images.length - 1
      })
      flatListRef.current?.scrollToIndex({
        index: activeIndex - 1,
      })
    }
  
    const handlePressRight = () => {
      if (activeIndex === images.length - 1)
      return flatListRef.current?.scrollToIndex({
        animated: false,
        index: 0
      })
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
      })
    }
  return (
<>
<FlatList
    ref={(ref) => (flatListRef.current = ref)}
    viewabilityConfig={viewConfig}
    data={images}
    keyExtractor={(item) => item}
    horizontal
    snapToAlignment='center'
    pagingEnabled
    onViewableItemsChanged={onViewRef.current}
    renderItem={({item, index}) => (
      <Image source={{uri: item}} style={styles.image}/>
    )}/>
        <TouchableOpacity style={[styles.chevron, {left:5}]} onPress={() => console.log("go left")} onPressIn={handlePressLeft}>
    <MaterialCommunityIcons name="chevron-left" color="white" size={45}/>
    </TouchableOpacity>
    
    <TouchableOpacity style={[styles.chevron, {right:5}]} onPress={() => console.log("go right")} onPressIn={handlePressRight}>
    <MaterialCommunityIcons name="chevron-right" color="white" size={45}/>
    </TouchableOpacity>
</>
  )
    }

export default ImageCarousel

const styles = StyleSheet.create({

    image: {height:250, width: WIDTH, borderTopLeftRadius: 5, borderTopRightRadius: 5},
    chevron: {
        position: "absolute", top:95
    }
    })