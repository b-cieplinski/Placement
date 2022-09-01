import { View, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, ViewStyle } from 'react-native'
import {Text, Button} from "@ui-kitten/components"
import { MaterialCommunityIcons } from '@expo/vector-icons'

import React, { useRef, useState } from 'react'
import { Screen } from '../components/Screen'
import {theme} from "../theme"
import { Property } from '../types/property'
import  ImageCarousel from "./ImageCarousel"

const LISTMARGIN = 10
const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2

const Card = ({property, style}: {property: Property; style?: ViewStyle}) => {
  return (
    <View style={style}>
    <ImageCarousel images={property.images}/>
    <View style={{ paddingVertical: 0, paddingHorizontal:0}}>
    <View style={{borderColor:"#d3d3d3", borderRadius: 5, borderWidth: 1, padding:10}}>
    <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
      <Text category={"s1"}>${property.rentLow.toLocaleString()} - ${property.rentHigh.toLocaleString()}</Text>
      <MaterialCommunityIcons name="heart-outline" color={theme["color-primary-500"]} size={24}/>
    </View>
    <Text category={"c1"}>{property.bedroomLow} - {property.bedroomHigh}</Text>
    <Text category={"c1"} style={{marginTop: 5}}>{property.name}</Text>
    <Text category={"c1"}>{property.street}</Text>
    <Text category={"c1"}>{property.city},{property.state}, {property.zip}</Text>

    <Text category={"c1"} style={{marginTop: 5}}>
      {property.tags.map((tag, index) => index === property.tags.length - 1 ? tag : `${tag}, `
      )}
    </Text>
    <View style={{flexDirection: "row", justifyContent: 'space-between', marginTop: 5, borderColor:"#d3d3d3", borderRadius: 5, borderWidth: 1, padding:5}}>
    <Button appearance={"ghost"} style={{borderColor: theme["color-primary-500"], width: "49%"}} size="small" onPress={() => console.log("email the property manager")}>Email</Button>
<Button onPress={() => console.log("call the property manager")} size="small" style={{width: "49%"}}>Call</Button>
    </View>

  </View>
  </View>
    </View>
  )
}

export default Card