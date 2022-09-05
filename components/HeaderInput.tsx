import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { theme } from "../theme"

export const HeaderInput = () => {
    return <TouchableOpacity onPress={() => console.log("navigate to inputscreen")} style={styles.container}>
    <View style={{flexDirection: "row", alignItems: "center"}}>
    <MaterialCommunityIcons name="magnify" color={theme["color-primary-500"]} size={28}/>
    <Text style={styles.text}>Find a Location</Text>
    </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container:{
        marginTop: Platform.OS === "ios" ? 50 : 30, 
        borderWidth: 1, 
        borderColor: "#d3d3d3", 
        borderRadius: 30, 
        padding:10},
        text: {marginLeft: 10}
})