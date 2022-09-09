import { StyleSheet, View, ViewStyle} from 'react-native'
import React from 'react'
import { Text } from '@ui-kitten/components'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

const ModalHeader = ({xShown, text, style}: {xShown?:boolean; text?:string; style?: ViewStyle | ViewStyle[]}) => {

    const navigation = useNavigation()

  if(text) {
    return (
    <View style={[styles.container, style as ViewStyle]}>
        {xShown ? (<MaterialCommunityIcons
        onPress={navigation.goBack}
        style={styles.x}
        name="close"
        color={theme["color-gray"]}
        size={24}
        />) : null}
      <Text category={"h5"}>{text}</Text>
    </View>
  )
}

return (
    <View style={[styles.container, style as ViewStyle]}>
        <View style={styles.bar}/>
    </View>
)
}

export default ModalHeader

const styles = StyleSheet.create({
    x: {
        position: "absolute", 
        left: 10, 
        alignSelf: "center"
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#d3d3d3",
        flexDirection: "row"
    },
    bar: {
        width: 50,
        backgroundColor: "#a4a4a4",
        height: 4,
        borderRadius: 30,
    }
})