// import { View, Text } from 'react-native'
// import React, { useEffect,useContext } from 'react'
// import { useNavigation, useRouter } from 'expo-router'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import {CreateTripContext} from './../../context/CreateTripContext'
// import 'react-native-get-random-values';
// // import { config } from 'expo-env';
// import Constants from 'expo-constants';

// const apiKey = Constants.expoConfig.extra.EXPO_PUBLIC_GOOGLE_MAP_KEY;
// // console.log(apiKey); // Should log your Google Maps API key

// // const { EXPO_PUBLIC_GOOGLE_MAP_KEY } = config();


// // import { Colors } from 'react-native/Libraries/NewAppScreen';
// const Colors = {
//     BLACK: '#000000',
//     WHITE: '#FFFFFF',
//     GRAY: '#808080', // Add a shade of gray
//   };
// export default function searchplace() {
//  const navigation=useNavigation();
//  const {tripdata,setTripData}=useContext(CreateTripContext)
//  const router=useRouter();//route to new page
//  useEffect(()=>{// use to manage the header of the page
//     navigation.setOptions({
//         headerShown:true,
//         headerTransparent:true,
//         headerTitle:'Search'
//     })
//  },[]);
//  useEffect(()=>{
//   console.log(tripdata);
//  }),[tripdata]
//     return (
//     <View
//       style={{ padding:25,paddingTop:100,backgroundColor:Colors.WHITE,height:'100%'
       
//       }}>
        
//           <GooglePlacesAutocomplete
//       placeholder='Search'
//       fetchDetails={true}
//       onFail={error=>console.log(error)}
//       onPress={(data, details = null) => {
//         if (!details) {
//           console.error('Details are null. Fetch failed.');
//           return;
//         }
//         // 'details' is provided when fetchDetails = true
//       //   console.log(data.description);
//       //  console.log(details?.geometry.location);
//       //  console.log(details?.photos[0]?.photo_reference);
//       //  console.log(details?.url);
//        setTripData({
//         locationInfo:{
//         name:data.description,
//         coordinates:details?.geometry.location,
//         photoRef:details?.photos[0]?.photo_reference,
//         url:details.url,
//         }
//        });
//        router.push('/create-trip/selectTraveler')
//       }}
//       // query={{
//       //   key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
//       //   language: 'en',
//       // }}
//       query={{
//         key: apiKey, // Replace process.env with the correct API key variable
//         language: 'en',
//       }}
      
//       styles={{
//         textInputContainer:{
//           borderWidth:1,
//           borderRadius:5,
//           marginTop:25
//         }
//       }}
//     />
//     </View>
//   )
// }
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "./../../context/CreateTripContext";

const MAPTILER_API_KEY = "uCBXEjePDis0WAcvUmjc";

export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const searchPlaces = async (query) => {
    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${MAPTILER_API_KEY}`
        );
        const text = await response.text(); // Get the raw response text
        console.log("Raw API response:", text); // Log the raw response
        
        try {
          const data = JSON.parse(text); // Try to parse the JSON
          setSearchResults(data.features);
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          console.log("Response that caused the error:", text);
        }
      } catch (error) {
        console.error("Error searching places:", error);
      }
    } else {
      setSearchResults([]);
    }
  };
  const handlePlaceSelect = (place) => {
    setTripData({
      locationInfo: {
        name: place.place_name,
        coordinates: {
          lat: place.center[1],
          lng: place.center[0],
        },
        // Note: MapTiler doesn't provide photo references or URLs directly
        // You may need to use a different API or service for images
        photoRef: null,
        url: null,
      },
    });
    router.push('/create-trip/selectTraveler');
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <TextInput
        placeholder="Search Place"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          searchPlaces(text);
        }}
        style={{
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 25,
          padding: 10,
        }}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePlaceSelect(item)}
            style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
          >
            <Text>{item.place_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}