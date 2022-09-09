import { View, Text, Platform, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Screen } from '../components/Screen'
import ModalHeader from '../components/ModalHeader'
import { Button, Input } from '@ui-kitten/components'
import { theme } from '../theme'
import { useNavigation } from '@react-navigation/native'
import  {getSuggestedLocations} from '../services/location'
import { Location } from '../types/locationiq'
import CurrentLocationButton from '../components/CurrentLocationButton'
import RecentSearchButton from '../components/RecentSearchButton'
import RecentSearchList from '../components/RecentSearchList'
import { useQueryClient } from 'react-query'

const FindLocationsScreen = () => {
    const navigation = useNavigation()
    const [value, setValue] = useState("")
    const [suggestions, setSuggestions] = useState<Location[]>([])
    const queryClient = useQueryClient();
    const recentSearches: Location[] | undefined = queryClient.getQueryData("recentSearches");


    const setRecentSearch = (location: Location) => {
        queryClient.setQueryData("recentSearches", () => {
            if (recentSearches) {
             let included = false; 
             for (let i of recentSearches) {
                if (
                    i.display_name === location.display_name &&
                    i.lon === location.lon &&
                    i.lat === location.lat
                ) {
                    included = true;
                    break
                }
             }  
             if (!included) return [location, ...recentSearches]
             return recentSearches;
            }
            return [location]
        })
    }


    const handleChange = async (val: string) => {
        setValue(val)
        if (val.length > 2) {
            const locations = await getSuggestedLocations(val);
            if (locations.length > 0) setSuggestions(locations)
        } else if (val.length === 0) setSuggestions([])
    }

    const handleSubmitEditing = async () => {
        const locations = await getSuggestedLocations(value);
        if (locations.length > 0) {
            handleNavigate(locations[0])
        }
        
    }

    const handleNavigate = (location: Location) => {
        setRecentSearch(location)
        navigation.navigate("Root", {
            screen: "SearchScreen",
            params: {
                location: getFormattedLocationText(location),
                lat: location.lat,
                lon: location.lon,
                boundingBox: location.boundingbox,

            }
        })
    }

    const getInput = () => {
        if (Platform.OS === "ios")
        return (
            <Input
            keyboardType="default"
            autoFocus
            selectionColor={theme["color-primary-500"]}
            placeholder="Enter Location"
            size={"large"}
            value={value}
            onChangeText={handleChange}
            onSubmitEditing={handleSubmitEditing}
            style={styles.defaultMarginTop}/>
        )

        return <View style={{flexDirection: "row"}}>
            <Input
            keyboardType="default"
            autoFocus
            selectionColor={theme["color-primary-500"]}
            placeholder="Enter Location"
            size={"large"}
            value={value}
            onChangeText={handleChange}
            onSubmitEditing={handleSubmitEditing}
            style={[styles.defaultMarginTop,{width: "80%"}]}/>
            <Button appearance={"ghost"} status="info" onPress={navigation.goBack}>Cancel</Button>
        </View>
    };

    const getFormattedLocationText = (item: Location) => {
        let location = item.address.name;
        if (item.type === "city" && item.address.state)
            location += ", " + item.address.state;
            return location
    }

    const SuggestedText = ({locationItem} : {locationItem: Location}) => {
        const location = getFormattedLocationText(locationItem)
        return (
            <View style={styles.suggestionContainer}>
                <Text>{location}</Text>
            </View>
        )
    }
  return (
    <Screen>
      {Platform.OS === "ios" ? <ModalHeader/> : null}
      <View style={styles.screenContent}>
      {getInput()}
      {suggestions.length > 0 ? 
      <FlatList
      data={suggestions}
      keyExtractor={(item, index) => item.place_id + index}
      renderItem={({ item, index}) => (
        <TouchableOpacity onPress={() => {
            handleNavigate(item)
        }}>
            <SuggestedText locationItem={item}/>
        </TouchableOpacity>
      )}/>
      : <ScrollView bounces={false}>
            <CurrentLocationButton style={styles.currentlocationbutton}/>
            <RecentSearchList style={{marginTop: 30}} recentSearches={recentSearches}/>
        </ScrollView>}
      </View>
    </Screen>
  )
}

export default FindLocationsScreen

const styles = StyleSheet.create ({
defaultMarginTop: {
    marginTop: 10
},
screenContent: {
    marginHorizontal: 10
},
suggestionContainer:{
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme["color-gray"]
},
    currentlocationbutton:{
        marginTop: 40,

    }
})