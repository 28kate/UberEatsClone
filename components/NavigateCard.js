import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
 import React from 'react'
 import tw from 'tailwind-react-native-classnames'
 import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
 
 const NavigateCard = () => {
    const dispatch=useDispatch();
    const navigation=useNavigation();
   return (
    <SafeAreaView style={tw`bg-white flex-1`}>
     <View>
       <Text style={tw`text-center py-5 text-xl`}>Hello Katie</Text>
       <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
             <GooglePlacesAutocomplete
             styles={toInputStyles}
             onPress={(data,details=null)=>{
                dispatch(setDestination({
                    location:details.geometry.location,
                    description:data.description,
                })
                )
               navigation.navigate('RideOptionsCard')
             }}
             placeholder='Where to?'
             nearbyPlacesAPI='GooglePLacesSearch'
             debounce={400}
             returnKeyType={'search'}
             enablePoweredByContainer={false}
             fetchDetails={true}
             query={{
                key:GOOGLE_MAPS_APIKEY,
                language:'en',
             }}
             />
        </View>
        <NavFavourites/>
        
       </View>
       
     </View>

     <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
     <TouchableOpacity
     onPress={()=>{
        navigation.navigate('RideOptionsCard')
     }}
     style={tw`flex flex-row justify-between bg-black w-24 py-5 rounded-full`}>
  <Icon
    name='car'
    type='font-awesome'
    color='white'
    size={16}
  />
  <Text>Rides</Text>
</TouchableOpacity>
<TouchableOpacity
     onPress={()=>{
        navigation.navigate('RideOptionsCard')
     }}
     style={tw`flex flex-row justify-between w-24 py-3 rounded-full`}>
  <Icon
    name='food'
    type='font-awesome'
    color='white'
    size={16}
  />
  <Text>Eats</Text>
</TouchableOpacity>
     </View>
     </SafeAreaView>
   )
 }
 
 export default NavigateCard

 const toInputStyles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        paddingTop:20,
        flex:0
    },
    textInput:{
        backgroundColor:'#DDDDDF',
        borderRadius:0,
        fontSize:0,
    },
    textInputContainer:{
        paddingHorizontal:20,
        paddingBottom:20
    }
 })