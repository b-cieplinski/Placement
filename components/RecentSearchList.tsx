import { View, Text, ViewStyle, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import RecentSearchButton from './RecentSearchButton';
import {getFormattedLocationText} from "../utils/getFormattedLocationText"
import { Button } from '@ui-kitten/components';
import {Location} from "../types/locationiq"
import { useNavigation } from '@react-navigation/native';


const RecentSearchList = ({recentSearches, style}: {recentSearches?: Location[]; style?: ViewStyle;}) => {
    const [showMore, setShowMore] = useState(false)
    const navigation = useNavigation()

    const handleButtonPress = () => setShowMore(!showMore);
    
    const handleRecentSearchButtonPress = (location: Location) => {
        navigation.navigate("Root", {
            screen: "SearchScreen",
            params: {
                location: getFormattedLocationText(location),
                lat: location.lat,
                lon: location.lon,
                boundingBox: location.boundingbox,
            },
        })
    }

    const ShowButton = ({text} : {text: string}) => (
        <Button
        appearance={"ghost"}
        status={"info"}
        style={{alignSelf: "flex-start"}}
        onPress={handleButtonPress}>{text}</Button>
    );

    const getList = () => {
        if (!recentSearches || recentSearches.length === 0) return;

        if (recentSearches.length > 2 && !showMore)
            return(
                <>
                {recentSearches.map((i, index) =>
                index < 2 ? (
                   <RecentSearchButton
                    key={i.display_name + index}
                    name={getFormattedLocationText(i)}
                    style={styles.recentSearchButton}
                    onPress={() => handleRecentSearchButtonPress(i)}/> 

                ) : null
                )}
                <ShowButton text="See More"/>
                </>
            )
            return (
                <>
                {recentSearches.map((i, index) => (
                    <RecentSearchButton 
                        key={i.display_name + index}
                        name={getFormattedLocationText(i)}
                        style={styles.recentSearchButton}
                        onPress={() => handleRecentSearchButtonPress(i)}/>
                ))}
                {recentSearches.length > 2 ? <ShowButton text="See Less"/> : null}
                </>
            )
    }
  return (
    <View style={style}>
      {getList()}
    </View>
  )
}

export default RecentSearchList

const styles = StyleSheet.create({
    recentSearchButton: {
        marginVertical: 5
    }
})