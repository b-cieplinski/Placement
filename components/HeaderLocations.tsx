import { View,  TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { theme } from '../theme'

import { LISTMARGIN } from '../constance'
import { Text } from '@ui-kitten/components'

const HeaderLocations = ({mapShown, setMapShown}:{mapShown: boolean; setMapShown: (bool: boolean) => void}) => {
  
    const handleMapPress = () => {
        if (mapShown) return setMapShown(false)
        setMapShown(true)
    }
  
  return (
<View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between", marginVertical: 5}}>
  <View style={{flexDirection: "row", alignItems: "center", }}>
    <MaterialCommunityIcons name="map-marker" size={18} color={theme['color-primary-500']}/> 
    <Text category={"c1"} appearance={"hint"}>12,064 Location Available</Text>
    <TouchableOpacity onPress={() => console.log("save")}>
    <Text category={"c1"} style={{color: theme["color-info-300"], fontWeight: "bold", marginLeft: 10}}>Save</Text>
    </TouchableOpacity>
  </View>
  <View style={{flexDirection: "row", marginLeft: 0}}>
  <TouchableOpacity onPress={() => console.log("Sort")} style={{flexDirection: "row"}}>
  <MaterialCommunityIcons name="sort" size={18} color={theme['color-info-300']}/>
    <Text category={"c1"} style={{color: theme["color-info-300"], fontWeight: "bold", marginLeft: 5}}>Sort</Text>
    </TouchableOpacity>
    {mapShown ? 
    
    <TouchableOpacity onPress={handleMapPress} style={{flexDirection: "row", marginLeft:20}}>
    <MaterialCommunityIcons name="format-list-bulleted" size={18} color={theme['color-info-300']}/>
    <Text category={"c1"} style={{color: theme["color-info-300"], fontWeight: "bold", marginLeft: 5}}>List</Text>
    </TouchableOpacity>

     : 
    
    <TouchableOpacity onPress={handleMapPress} style={{flexDirection: "row", marginLeft:20}}>
    <MaterialCommunityIcons name="map" size={18} color={theme['color-info-300']}/>
    <Text category={"c1"} style={{color: theme["color-info-300"], fontWeight: "bold", marginLeft: 5}}>Map</Text>
    </TouchableOpacity>}

  </View>
</View>
  )
}

export default HeaderLocations