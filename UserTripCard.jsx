
// import { View, Text ,Image} from 'react-native'
// import React from 'react'
// import moment from 'moment'

// export default function UserTripCard({trip}) {
//     const formatData=(data)=>{
//     return JSON.parse(data);
//     }
//   return (
//     <View style={{
//         marginTop:20,
//         display:'flex',
//         flexDirection:'row',
//         gap:10,
//         alignItems:'center'
//     }}>
      
//       <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+formatData(trip.tripData).locationInfo?.photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
        
//             style={{
//                 width:100,
//                 height:100,
//                 borderRadius:15}}/>
//       <View>
//         <Text style={{
//             fontFamily:'outfit-medium',
//             fontSize:18,

//         }}>{trip.tripPlan?.travelPlan?.location}</Text>
//         <Text style={{
//             fontFamily:'outfit',
//             fontSize:14,
//             color:Colors.GRAY
//         }}>{moment(formatData(trip.tripdata).startDate).format('DD MMM yyyy')}</Text>
//         <Text style={{
//               fontFamily:'outfit',
//               fontSize:14,
//               color:Colors.GRAY
//         }}>Traveling:{formatData(trip.tripdata).traveler.title}</Text>

//       </View>
//     </View>
//   )
// }
// import { View, Text, Image } from 'react-native';
// import React from 'react';
// import moment from 'moment';

// const Colors = {
//   GRAY: "#888888",
// };

// export default function UserTripCard({ trip }) {
//   // Ensure tripData is parsed correctly
//   const formatData = (data) => (typeof data === "string" ? JSON.parse(data) : data);
  
//   const parsedTrip = formatData(trip.tripData); // Ensure it's an object

//   return (
//     <View style={{
//       marginTop: 20,
//       display: 'flex',
//       flexDirection: 'row',
//       gap: 10,
//       alignItems: 'center'
//     }}>
//       <Image 
//         source={{
//           uri: parsedTrip.locationInfo?.photoRef
//             ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${parsedTrip.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
//             : require('./../../assets/images/p1.jpg'), // Fallback image
//         }}
//         style={{
//           width: 100,
//           height: 100,
//           borderRadius: 15
//         }}
//       />
//       <View>
//         <Text style={{
//           fontFamily: 'outfit-medium',
//           fontSize: 18,
//         }}>
//           {trip.tripPlan?.travelPlan?.location || "Unknown Location"}
//         </Text>
//         <Text style={{
//           fontFamily: 'outfit',
//           fontSize: 14,
//           color: Colors.GRAY
//         }}>
//           {moment(parsedTrip.startDate).format('DD MMM yyyy')}
//         </Text>
//         <Text style={{
//           fontFamily: 'outfit',
//           fontSize: 14,
//           color: Colors.GRAY
//         }}>
//           Traveling: {parsedTrip.traveler?.title || "No traveler info"}
//         </Text>
//       </View>
//     </View>
//   );
// }
// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import moment from 'moment';
// import axios from 'axios';
// import { useRouter } from 'expo-router';


// // Function to fetch image URL from Pixabay
// const fetchImageUrl = async (query) => {
//   const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
//   try {
//     const response = await axios.get("https://pixabay.com/api/", {
//       params: {
//         key: apiKey,
//         q: query,
//         image_type: 'photo',
//       },
//     });
//     return response.data.hits[0]?.largeImageURL || null;
//   } catch (error) {
//     console.error("Error fetching image from Pixabay:", error);
//     return null;
//   }
// };

// const UserTripCard = ({ trip }) => {
//   const [photoUrl, setPhotoUrl] = useState(null);
//   const router = useRouter();

//   if (!trip) {
//     console.error('Trip data is missing');
//     return null;
//   }

//   let tripData;

//   // Safely parse tripData
//   try {
//     tripData = typeof trip.tripData === 'string' ? JSON.parse(trip.tripData) : trip.tripData;
//   } catch (error) {
//     console.error('Failed to parse trip data:', error);
//     return null;
//   }

//   useEffect(() => {
//     const fetchPhoto = async () => {
//       if (tripData?.locationInfo?.name) {
//         const url = await fetchImageUrl(tripData.locationInfo.name.trim());
//         setPhotoUrl(url);
//       }
//     };
//     fetchPhoto();
//   }, [tripData?.locationInfo?.name]);

//   const handlePress = () => {
//     console.log("Trip data before navigation:", JSON.stringify(trip, null, 2));
//     router.push({
//       pathname: '/trip-details',
//       params: { trip:JSON.stringify(trip) }
//     });
//   };
  
//   if (!tripData || !tripData.locationInfo) {
//     return null;
//   }

//   return (
//     <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
//       <Image
//         source={photoUrl ? { uri: photoUrl } : require('./../../assets/images/p1.jpg')}
//         style={styles.cardImage}
//       />
//       <View style={styles.cardInfo}>
//         <Text style={styles.cardLocation}>
//           🌍 {tripData.locationInfo.name.trim()}
//         </Text>
//         <Text style={styles.cardDate}>
//           📅 {moment(trip.startDate).format('MMM Do YYYY')} - {moment(trip.endDate).format('MMM Do YYYY')}
//         </Text>
//         <Text style={styles.cardBudget}>
//           💸 Budget: {tripData.budget}
//         </Text>
//         <TouchableOpacity style={styles.button} onPress={handlePress}>
//           <Text style={styles.buttonText}>See Your Plans</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//     marginBottom: 16,
//     elevation: 2,
//   },
//   cardImage: {
//     width: '100%',
//     height: 150,
//   },
//   cardInfo: {
//     padding: 16,
//   },
//   cardLocation: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   cardDate: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 4,
//   },
//   cardBudget: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 4,
//   },
//   button: {
//     backgroundColor: "#007AFF",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//     alignSelf: "flex-start",
//     marginTop: 8,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });

// export default UserTripCard;
import { StyleSheet, Text, View, Image } from 'react-native';
import moment from 'moment';

const Colors = {
  black: "#000000",
  white: "#FFFFFF",
  gray: "#808080",
  primary: "#007AFF", // Example primary color (iOS blue)
};

const UserTripCard = ({ trip }) => {
  const formatData = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing data:', error);
      return null;
    }
  };

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;
  const tripData = formatData(trip?.tripData);
  const photoRef = tripData?.locationInfo?.photoRef;
  
  const imageUrl = photoRef && apiKey 
    ? `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${photoRef}&key=${apiKey}`
    : null;

  return (
    <View style={styles.flexContainer}>
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
        />
      ) : (
        <Image 
          source={require('./../../assets/images/p1.jpg')} 
          style={styles.image} 
        />
      )}
      <View style={{marginLeft:10}}>
        <Text style={styles.paragraph}>
          {trip?.tripPlan?.travel_plan?.destination}
        </Text>
        <Text style={styles.smallPara}>
          {moment(tripData?.startDate).format("DD MMM YYYY")}
        </Text>
        <Text style={styles.smallPara}>
          Travelling: {tripData?.traveler?.title}
        </Text>
      </View>
    </View>
  );
};

export default UserTripCard;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  
  },
  paragraph: {
    fontFamily: 'Outfit-Medium',
    fontSize: 18,
  },
  smallPara: {
    fontFamily: 'Outfit',
    fontSize: 14,
    color: Colors.gray,
  },
});