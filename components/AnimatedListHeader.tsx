import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Button, Divider, Text } from "@ui-kitten/components"
import { useState } from "react"
import { Animated, FlatList, LayoutChangeEvent, Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { HEADERHEIGHT, LISTMARGIN } from "../constance"
import { theme } from "../theme"
import HeaderFilterButtons from "./HeaderFilterButtons"
import { HeaderInput } from "./HeaderInput"
import HeaderLocations from "./HeaderLocations"

export const AnimatedListHeader = ({scrollAnimation, setMapShown, mapShown, location}: {location:string; scrollAnimation: Animated.Value; mapShown: boolean; setMapShown: (bool: boolean) => void}) => {

    const [offsetAnimation] = useState(new Animated.Value(0))
    const [clampedScroll, setClampedScroll] = useState(Animated.diffClamp(Animated.add(
      scrollAnimation.interpolate({
        inputRange: [0,1],
        outputRange: [0,1],
        extrapolateLeft: "clamp"
      }),
      offsetAnimation
      ),
      0,1
      ))

    const navbarTranslate = clampedScroll.interpolate ({
        inputRange: [0, HEADERHEIGHT],
        outputRange: [0, -HEADERHEIGHT],
        extrapolate: "clamp"
    })


    const onLayout = (event: LayoutChangeEvent) => {
        let {height} = event.nativeEvent.layout
        setClampedScroll(
          Animated.diffClamp(
            Animated.add(
              scrollAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: "clamp",
              }),
              offsetAnimation
            ),
            0,
            height
          )
        )
      }

      const filterButtons = [
        {
            iconName: "filter-variant",
            onPress: () => console.log("filter all")
        },
        {
            label: "Price",
            onPress: () => console.log("Price")
        },
        {
            label: "Beds and Baths",
            onPress: () => console.log("Beds and Baths")
        },
        {
            label: "Move-In Dates",
            onPress: () => console.log("Move-In Dates")
        },
        {
            label: "Pets",
            onPress: () => console.log("Pets")
        }
      ]
    return (
        <Animated.View onLayout={onLayout} style={[styles.container,{transform: [{translateY: navbarTranslate}]}]}>
<View style={{marginHorizontal: LISTMARGIN}}>
<HeaderInput location={location}/>
<HeaderFilterButtons filterButtons={filterButtons}/>
</View>
<Divider style={{backgroundColor: theme["color-primary-500"]}}/>
<HeaderLocations setMapShown={setMapShown} mapShown={mapShown}/>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        borderColor: "#d3d3d3",
        marginHorizontal: 3
    },
    container: { 
      position: "absolute", 
      top:0, 
      right:0, 
      left:0, 
      zIndex:1000, 
      height: 190, 
      backgroundColor: "white"}
})