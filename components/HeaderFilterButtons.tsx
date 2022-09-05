import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button } from '@ui-kitten/components'
import { theme } from '../theme'

const HeaderFilterButtons = ({filterButtons}:{filterButtons: any}) => {
  return (
<FlatList style={{marginVertical: 10}}
showsHorizontalScrollIndicator horizontal data={filterButtons} keyExtractor={(index) => index.toString()} renderItem={({item,index}) => {
    if(item.iconName) {
        return <Button appearance={"ghost"} style={[styles.button, { width: 48}]}
        onPress={item.onPress}
        accessoryLeft={
            <MaterialCommunityIcons name={item.iconName as any} size={20} color={theme["color-primary-500"]}/>
        }></Button>
    }
    return <Button appearance={"ghost"} style={styles.button} onPress={item.onPress}>
        {item.label}
    </Button>
}}/>
  )
}

export default HeaderFilterButtons

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        borderColor: "#d3d3d3",
        marginHorizontal: 3
    },
})