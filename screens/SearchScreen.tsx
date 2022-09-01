import { View, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native'
import {Text, Button} from "@ui-kitten/components"
import { MaterialCommunityIcons } from '@expo/vector-icons'

import React, { useRef, useState } from 'react'
import { Screen } from '../components/Screen'
import {theme} from "../theme"
import Card from '../components/Card'

const LISTMARGIN = 10
const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2

const SearchScreen = () => {

  const properties = [{
    id:1,
    images: [
      'https://images.unsplash.com/photo-1661243038698-dc8b600f23d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80',
      'https://images.unsplash.com/photo-1660150912355-83e1298d0115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    ],
    rentLow: 3627,
    rentHigh:6582,
    bedroomLow: 1, 
    bedroomHigh: 5,
    name: "The Hamiltons",
    street: "429 Zero No",
    city: "Warsaw",
    state: "Floryda",
    zip: 12345,
    tags: ["Parking", "Pool"]
  },
  {
    id:2,
    images: [
      'https://images.unsplash.com/photo-1661243038698-dc8b600f23d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80',
      'https://images.unsplash.com/photo-1660150912355-83e1298d0115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    ],
    rentLow: 3627,
    rentHigh:6582,
    bedroomLow: 1, 
    bedroomHigh: 5,
    name: "The Hamiltonssssss",
    street: "429 Zero No",
    city: "Warsaw",
    state: "Floryda",
    zip: 12345,
    tags: ["Parking", "Pool"]
  }]



  
  return (
    <Screen style={{marginHorizontal: LISTMARGIN}}>
      <FlatList 
      data={properties} 
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
<Card property={item}/>
      )}/>
    </Screen>
  )
}

export default SearchScreen