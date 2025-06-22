
// import { View, Text, TouchableOpacity } from 'react-native'
// import React from 'react'
// import {useRouter} from 'expo-router'
// const Colors = {
//   PRIMARY: "#007AFF",
//   WHITE: "#FFFFFF",
// };
// export default function UserTripList({userTrips}) {
//   if (!userTrips || userTrips.length === 0) {
//     return <Text>No trips available</Text>; // Handle empty state gracefully
//   }

//   // const LatestTrip = JSON.parse(UserTrips[0]?.tripdata || '{}'); // Prevent error if undefined

//   const LatestTrip=JSON.parse(userTrips[0].tripdata)
//   const router=useRouter();
  
//   return (
//     <View>
//      <View style={{
//       marginTop:20
//      }}>
//       {
//         LatestTrip?.locationInfo?.photoRef?
//         <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+LatestTrip.locationInfo?.photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
//         style={{
//           width:'100%',
//       height:240,
//       objectFit:'cover',
//       borderRadius:15
//         }}/>
//         :
      
//       <Image source={require('./../../assets/images/p1.jpg')}
//       style={{
//       width:'100%',
//       height:240,
//       objectFit:'cover',
//       borderRadius:15}}/>
//       }
//       <View style={{
//         marginTop:10
//       }}>
//       <Text style={{
//         fontSize:20
//       }}>
//         {userTrips[0].tripPlan.tripPlan?.location}
//       </Text>
//       <View style={{
//         display:'flex',
//         flexDirection:'row',
//         justifyContent:'space-between',marginTop:5
//       }}>
//       <Text style={{
//         fontFamily:'outfit',
//         fontSize:17
//       }}>{moment(LatestTrip.startDate).format('DD MMM yyyy')}</Text>
//        <Text style={{
//          fontFamily:'outfit',
//          fontSize:17
//        }}>🚌 {LatestTrip.traveler.title}</Text>
//        </View>
//        <TouchableOpacity onPress={()=>router.push({pathname:'/trip-details',params:{
//         trip:JSON.stringify(userTrips[0])
//        }})}
//        style={{
//           backgroundColor:Colors.PRIMARY,
//           padding:15,
//           borderRadius:15,
//           marginTop:10
//        }}>
//         <Text style={{
//           color:Colors.WHITE,
//           textAlign:'center',
//           fontFamily:'outfit-medium',
//           fontSize:15
//         }}>See your Plan</Text>
//        </TouchableOpacity>
//       </View>
//       {userTrips.map((trip,index)=>(
//         <UserTripCard trip={trip} key={index}/>
//       ))}
//      </View>
//     </View>
//   )
// }

// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import React from 'react';
// import { useRouter } from 'expo-router';
// import moment from 'moment';
// import UserTripCard from "./UserTripCard";


// const Colors = {
//   PRIMARY: "#007AFF",
//   WHITE: "#FFFFFF",
// };

// export default function UserTripList({ userTrips }) {
//   if (!userTrips || userTrips.length === 0) {
//     return <Text>No trips available</Text>; // Handle empty state gracefully
//   }

//   const router = useRouter();

//   // ✅ SAFEGUARD: Ensure tripdata exists and is valid JSON
//   let LatestTrip = {};
//   try {
//     LatestTrip = userTrips[0].tripdata ? JSON.parse(userTrips[0].tripdata) : {};
//   } catch (error) {
//     console.error("🚨 JSON Parsing Error:", error.message);
//     LatestTrip = {}; // Prevent crash by setting default empty object
//   }

//   return (
//     <View>
//       <View style={{ marginTop: 20 }}>
//         {LatestTrip?.locationInfo?.photoRef ? (
//           <Image
//             source={{
//               uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LatestTrip.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
//             }}
//             style={{
//               width: "100%",
//               height: 240,
//               objectFit: "cover",
//               borderRadius: 15,
//             }}
//           />
//         ) : (
//           <Image
//             source={require("./../../assets/images/p1.jpg")}
//             style={{
//               width: "100%",
//               height: 240,
//               objectFit: "cover",
//               borderRadius: 15,
//             }}
//           />
//         )}

//         <View style={{ marginTop: 10 }}>
//           <Text style={{ fontSize: 20 }}>
//             {userTrips[0]?.tripPlan?.tripPlan?.location || "Unknown Destination"}
//           </Text>
//           <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
//             <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
//               {LatestTrip.startDate ? moment(LatestTrip.startDate).format("DD MMM yyyy") : "Unknown Date"}
//             </Text>
//             <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
//               🚌 {LatestTrip.traveler?.title || "Traveler"}
//             </Text>
//           </View>

//           <TouchableOpacity
//             onPress={() =>
//               router.push({
//                 pathname: "/trip-details",
//                 params: { trip: JSON.stringify(userTrips[0]) },
//               })
//             }
//             style={{
//               backgroundColor: Colors.PRIMARY,
//               padding: 15,
//               borderRadius: 15,
//               marginTop: 10,
//             }}
//           >
//             <Text
//               style={{
//                 color: Colors.WHITE,
//                 textAlign: "center",
//                 fontFamily: "outfit-medium",
//                 fontSize: 15,
//               }}
//             >
//               See your Plan
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {userTrips.map((trip, index) => (
//           <UserTripCard trip={trip} key={index} />
//         ))}
//       </View>
//     </View>
//   );
// }




import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import moment from "moment";
import axios from "axios";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

const fetchImage = async (locationName) => {
  const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: apiKey,
        q: locationName,
        image_type: 'photo',
      },
    });
    return response.data.hits[0].largeImageURL;
  } catch (error) {
    console.error("Error fetching image from Pixabay:", error);
    throw error; // Throw the error to handle it in the caller function
  }
};

export default function UserTripList({ userTrips }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("Rendering UserTripList with userTrips:", userTrips);
    if (userTrips && userTrips.length > 0) {
      const firstTripLocation = JSON.parse(userTrips[0].tripData).locationInfo.name;
      fetchImage(firstTripLocation)
        .then(url => {
          setImageUrl(url);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching image:', error);
          setLoading(false);
        });
    }
  }, [userTrips]);

  if (!userTrips || userTrips.length === 0) {
    return <Text>No trips available</Text>;
  }

  // Parse the tripData JSON string for the first trip
  const firstTrip = {
    ...userTrips[0],
    tripData: JSON.parse(userTrips[0].tripData),
  };

  // Parse the tripData JSON string for the rest of the trips
  const otherTrips = userTrips.slice(1).map((trip) => ({
    ...trip,
    tripData: JSON.parse(trip.tripData),
  }));

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bigTripCard}>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <Image source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/p1.jpg')} style={styles.image} />
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.location}>
              🌍 {firstTrip.tripData.locationInfo.name}
            </Text>
            <Text style={styles.dates}>
              📅 {moment(firstTrip.startDate).format("MMM Do")} -{" "}
              {moment(firstTrip.endDate).format("MMM Do, YYYY")}
            </Text>
            <Text style={styles.travelers}>
              🚌 {firstTrip.tripData.traveler.title} - {firstTrip.tripData.traveler.desc}
            </Text>
            <TouchableOpacity style={styles.button}
              onPress={() => router.push({ pathname: '/trip-details', params: { trip: JSON.stringify(userTrips[0]) } })}>
              <Text style={styles.buttonText}>See Your Plans</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {otherTrips.map((trip, index) => (
          <UserTripCard trip={JSON.stringify(trip)} key={index} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  bigTripCard: {
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  location: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  dates: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  travelers: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});





// import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
// import moment from 'moment'
// // import { Colors } from './../../constants/Colors';
// import UserTripCard from './UserTripCard';
// import {useRouter } from 'expo-router';
// const Colors = {
//   black: "#000000",
//   white: "#FFFFFF",
//   gray: "#808080",
//   primary: "#007AFF", // Example primary color (iOS blue)
// };
// const UserTripList = ({ userTrips }) => {
//     const router = useRouter();
//     console.log('userTrips from UserTripList',userTrips)
//     const latestTrip = JSON.parse(userTrips[0].tripData)
//     const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;
//     const photoRef = latestTrip?.locationInfo?.photoRef;

//     const imageUrl = photoRef && apiKey 
//     ? `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${photoRef}&key=${apiKey}`
//     : null;

//   return (
//     <View>
//       <View style={{ marginTop: 20 }}>
//         {imageUrl?
//         <Image 
//         source={{ uri: imageUrl }} 
//         style={styles.image} 
//       />
//         :<Image 
//           source={require('./../../assets/images/p1.jpg')} 
//           style={styles.image} 
//         />
//       }
//         <View style={{marginTop:10}}>
//           <Text style={styles.paragraph}>
//             {userTrips[0]?.tripPlan?.travel_plan?.destination}
//           </Text>
//           <View style={styles.flexContainer}>
//             <Text style={styles.smallPara}>{moment(latestTrip.startDate).format("DD MMM YYYY")}</Text>
//             <Text style={styles.smallPara}> 🚌 {latestTrip.traveler.title}</Text>
//           </View>
//           <TouchableOpacity style={styles.button}
//             onPress={()=>router.push({pathname:'/trip-details',
//               params:{trip:JSON.stringify(userTrips[0])}

//             })}
//             >
//           <Text style={{textAlign:'center',color:Colors.white,fontFamily:'Outfit-Medium',fontSize:15}}>See Your Plan</Text>
//         </TouchableOpacity>

//         </View>
        
//         {userTrips.map((trip, index) => (  
//           <UserTripCard trip={trip} key={index} />
//         ))}

//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     width: '100%',
//     height: 240,
//     resizeMode: 'cover',
//     borderRadius: 15,
//   },
//   paragraph: {
//     fontFamily: 'Outfit-Medium',
//     fontSize: 20,
//   },
//   smallPara: {
//     fontFamily: 'Outfit',
//     fontSize: 17,
//     color:Colors.gray
//   },
//   flexContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent:'space-between',
//     marginTop:5
//   },
//   button: {
//     padding: 15,
//     backgroundColor: Colors.primary,
//     borderRadius:15,
//      marginTop:15

//   },
// });

// export default UserTripList;