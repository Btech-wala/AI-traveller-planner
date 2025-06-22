import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
const Colors = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GRAY: '#808080', // Add a shade of gray
};

export default function Startnewtrip() {
  const router=useRouter();
  return (
    <View style={{
      padding:20,marginTop:50,display:'flex',
      alignItems:'center',
      gap:20//use to gove gap between the component

    }}>
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text style={{
        fontSize:25,
        fontWeight:'bold',
        marginTop:10
      }}>No trips planned yet</Text>
       <Text style={{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        color:Colors.GRAY,
        marginTop:10
      }}>Look like its time to plana new travel experience!Get Started below</Text>
      //button
      <TouchableOpacity onPress={()=>router.push('/create-trip/search-place')} style={{
        padding:15,
        backgroundColor:Colors.BLACK,
        borderRadius:15,
        paddingHorizontal:30
      }}>
        <Text  style={{
          color:Colors.WHITE,
          fontSize:17
        }}>Start a new trip</Text>
      </TouchableOpacity>
    </View>
  )
}