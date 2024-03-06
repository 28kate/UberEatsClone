import { View, Text, SafeAreaView ,TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeDestination } from '../slices/navSlice'

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8"
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf"
  }
]
const zarToBaseCurrencyRate = 0.3;

const RideOptionsCard = () => {
  const navigation=useNavigation()
  const[select,setSelect]=useState(null)
  const travelTimeDestination=useSelector(selectTravelTimeDestination)
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
       <View>
        <TouchableOpacity style={tw`bg-black py-3 m-3 ${!select && "bg-gray-300"}`}
        disabled={!select}
        >
  <Text style={tw`text-center text-white text-xl`}>Choose {select?.title}</Text>
</TouchableOpacity>

        </View>
        <Text style={tw`text-center py-5 text-xl`}>Select A Ride - {travelTimeDestination?.distance.text}</Text>
        <FlatList data={data}
        keyExtractor={(item)=>item.id}
        renderItem={({item:{id,title,multiplier,image},item})=>(
          <TouchableOpacity style={tw`flex-row justify-between items-center px-10 ${id===select?.id && 'bg-gray-200'}`}

          onPress={()=>{
            setSelect(item)
          }}
          >
           <Image
           style={{
            width:100,
            height:100,
            resizeMode:"contain"
           }}
           source={{url:image}}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeDestination?.duration.text} Travel time...</Text>
            </View>
            <Text style={tw`text-xl`}>
            {new Intl.NumberFormat('en-za', // Use 'en-za' for South African Rand (ZAR)
                {
                  style: 'currency',
                  currency: 'ZAR', // Use 'ZAR' as the currency code
                }).format(
                  (travelTimeDestination?.duration.value * zarToBaseCurrencyRate * multiplier * zarToBaseCurrencyRate)
                )}


            </Text>
          </TouchableOpacity>
        )}
        />
       
    </SafeAreaView>
  )
}

export default RideOptionsCard