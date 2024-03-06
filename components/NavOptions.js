import { Text, FlatList, TouchableOpacity,Image,View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import {Icon} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data=[
    {
        id:"123",
        title:"Get a ride",
        image:"https://banner2.cleanpng.com/20180810/jaj/kisspng-sports-car-clip-art-volkswagen-beetle-openclipart-image-cartoon-car-image-group-58-5b6dcdc1dcbee2.2172566515339227539042.jpg",
        screen:"MapScreen"
    },
    {
        id:"1234",
        title:"Order Food",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKRvSFIYI0ELntGEOqnZquOgFWvaFU1zO1LQ&usqp=CAU",
        screen:"EatsScreen"
    }

]

const NavOptions = () => {
  const navigation=useNavigation();
  const origin=useSelector(selectOrigin)
    return (
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
            onPress={()=>
               {navigation.navigate(item.screen)}
            }
            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
            disabled={!origin}
            >
              <View style={tw`${!origin && "opacity-20"}`}>
                <Image
                style={{width:90,height:90, resizeMode:"contain"}}
                source={{
                  url:item.image
                }}
                />
                <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                <Icon style={tw`p-2 bg-black rounded-full w-10 mt-4`}name='arrowright' color='white' type='antdesign'/>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
  

export default NavOptions