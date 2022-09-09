import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import MapView, { Region } from 'react-native-maps'
import { Property } from '../types/property'
import MapMarker from './MapMarker'
import { theme } from '../theme'
import { useNavigation } from '@react-navigation/native'
import Card from './Card'

const Map = ({properties, mapRef, initialRegion}:{properties: Property[]; mapRef: React.MutableRefObject<MapView | null>; initialRegion?: Region | undefined;}) => {

    const [activeIndex, setActiveIndex] = useState(-1)

    const navigation = useNavigation()

    const unFocusProperty = () => {
        setActiveIndex(-1);
        navigation.setOptions({tabBarStyle: {display: "flex"}})
    }

    const handleMapPress = () => {
        if (Platform.OS === "android") unFocusProperty();
    }

    const handleMarkerPress = (index: number) => {
        if (Platform.OS === "ios") {
            setTimeout(() => (mapRef.current?.animateCamera({center: {latitude: properties[index].lat, longitude: properties[index].lng}})), 100)
        }

        setActiveIndex(index)
        navigation.setOptions({tabBarStyle: {display: "none"}})

    }

  return (
    <View style={styles.container}>
    <MapView style={styles.mapcontainer} ref={mapRef} userInterfaceStyle={"light"} onPress={handleMapPress} initialRegion={initialRegion ? initialRegion: undefined}>
        {properties.map((i, index) => <MapMarker lat={i.lat} lng={i.lng} color={activeIndex === index ? theme["color-info-400"] : theme["color-primary-500"]} onPress={() => handleMarkerPress(index)}/>)}
    </MapView>
    {activeIndex > -1 && (<Card property={properties[activeIndex]} style={styles.card}/>)}
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
    container: {flex: 1, overflow: "hidden"},
    mapcontainer: {height: "100%", width: "100%"},
    card: {
        position: "absolute",
        bottom: 10,
        height: 360,
        backgroundColor: "#ffffff",
        width: 500,
        marginHorizontal:6 
    }
})