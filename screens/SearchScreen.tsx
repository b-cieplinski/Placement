import { Dimensions, FlatList, Animated, LayoutChangeEvent, View } from 'react-native'
import {Text, Button} from "@ui-kitten/components"
import { MaterialCommunityIcons } from '@expo/vector-icons'

import React, { useEffect, useRef, useState } from 'react'
import { Screen } from '../components/Screen'
import {theme} from "../theme"
import Card from '../components/Card'
import { HEADERHEIGHT } from '../constance'
import { AnimatedListHeader } from '../components/AnimatedListHeader'
import MapView from 'react-native-maps'
import Map from '../components/Map'
import { SearchScreenParams } from '../types'

const LISTMARGIN = 10
// const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2

const SearchScreen = ({route}:{route:{params: SearchScreenParams}}) => {
  const [scrollAnimation] = useState(new Animated.Value(0))
  const [mapShown,setMapShown] = useState<boolean>(false) 
  const mapRef = useRef<MapView | null>(null)

  useEffect(() => {
    if (route.params) {
      mapRef?.current?.animateCamera({
        center: {
          latitude: Number(route.params.lat),
          longitude: Number(route.params.lon)
        }
      })
    }
  }, [route])

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
    name: "1 Great",
    street: "429 Zero No",
    city: "Warsaw",
    state: "Floryda",
    zip: 12345,
    tags: ["Parking", "Pool"],
    lat:52.23398799976434, 
    lng:20.996426980113466
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
    name: "2 Fantastic",
    street: "429 Zero No",
    city: "Warsaw",
    state: "Floryda",
    zip: 12345,
    tags: ["Parking", "Pool"],
    lat:52.22492196874307, 
    lng:21.007781971831804
  },
  {
    id:3,
    images: [
      'https://images.unsplash.com/photo-1661243038698-dc8b600f23d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80',
      'https://images.unsplash.com/photo-1660150912355-83e1298d0115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    ],
    rentLow: 3627,
    rentHigh:6582,
    bedroomLow: 1, 
    bedroomHigh: 5,
    name: "3 Superancko",
    street: "429 Zero No",
    city: "Warsaw",
    state: "Floryda",
    zip: 12345,
    tags: ["Parking", "Pool"],
    lat: 52.224831299084606, 
    lng: 21.01224361667126
  },
  {
    id:4,
    images: [
      'https://images.unsplash.com/photo-1661243038698-dc8b600f23d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80',
      'https://images.unsplash.com/photo-1660150912355-83e1298d0115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    ],
    rentLow: 3627,
    rentHigh:6582,
    bedroomLow: 1, 
    bedroomHigh: 5,
    name: "4 Fanticomo",
    street: "429 Zero No",
    city: "Warsaw",
    state: "Floryda",
    zip: 12345,
    tags: ["Parking", "Pool"],
    lat:52.222655171702066, 
    lng:21.011503533268183
  },
  {
    id:5,
    images: [
      'https://images.unsplash.com/photo-1661243038698-dc8b600f23d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80',
      'https://images.unsplash.com/photo-1660150912355-83e1298d0115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    ],
    rentLow: 3627,
    rentHigh:6582,
    bedroomLow: 1, 
    bedroomHigh: 5,
    name: "5 Simo simo",
    street: "429 Zero No",
    city: "Warsaw",
    state: "Floryda",
    zip: 12345,
    tags: ["Parking", "Pool"],
    lat: 52.22874287888682, 
    lng: 21.015436547129294
  },
  {
    id:6,
    images: [
      'https://images.unsplash.com/photo-1661243038698-dc8b600f23d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80',
      'https://images.unsplash.com/photo-1660150912355-83e1298d0115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    ],
    rentLow: 3627,
    rentHigh:6582,
    bedroomLow: 1, 
    bedroomHigh: 5,
    name: "6 Elo siema",
    street: "429 Zero No",
    city: "Warsaw",
    state: "Floryda",
    zip: 12345,
    tags: ["Parking", "Pool"],
    lat: 52.22696846321057, 
    lng: 21.022689363121618
  }]





  
  return (
    <Screen style={{marginHorizontal: LISTMARGIN}}>
      <AnimatedListHeader scrollAnimation={scrollAnimation} setMapShown={setMapShown} mapShown={mapShown} location={route.params ? route.params.location : "Find a location"}/>
      { mapShown ?
<Map 
properties={properties} 
mapRef={mapRef}
initialRegion={
  route.params ? 
  {
    latitude: Number(route.params.lat),
    longitude: Number(route.params.lon),
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  } : undefined
}
/> :  <Animated.FlatList 
      onScroll={Animated.event([{
        nativeEvent: {
          contentOffset: {
            y: scrollAnimation
          }
        }
      }], {useNativeDriver: true})}
      contentContainerStyle={{paddingTop: HEADERHEIGHT - 20}}
      bounces={false}
      scrollEventThrottle={16}
      data={properties} 
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
<Card property={item}/>
      )}/>
      }

      
     
    </Screen>
  )
}

export default SearchScreen