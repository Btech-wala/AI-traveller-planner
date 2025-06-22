// import { View, Text } from 'react-native'
// import React from 'react'
// // import { Colors } from 'react-native/Libraries/NewAppScreen'
// const Colors = {
//     BLACK: '#000000',
//     WHITE: '#FFFFFF',
//     GRAY: '#808080', // Add a shade of gray
//   };

// export default function OptionCrd({option,selectedTraveler}) {
//   return (
//     // <View style={[{
//     //     padding:15,
//     //     display:'flex',
//     //     flexDirection:'row',
//     //     justifyContent:'space-between',
//     //     backgroundColor:Colors.GRAY},
//     //     borderRadius:15
//     // },selectedTraveler==option.title&&{borderWidth:3}]}>
//     <View
//   style={[
//     {
//       padding: 15,
//       display: 'flex',
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       backgroundColor: Colors.GRAY,
//       borderRadius: 15,
//     },
//     selectedTraveler === option.title && { borderWidth: 3 },
//   ]}
// >
//         <View>
//       <Text style={{
//         fontSize:20,
//         fontWeight:'bold'
//       }}>
//         {option?.title}
//       </Text>
//       <Text style={{
//         fontSize:17,
//         fontWeight:'bold',
        
//       }}>
//         {option?.desc}

//       </Text>
//       <Text style={{
//         fontSize:40,
        
        
//       }}>
//         {option?.icon}

//       </Text>

//       </View>
//     </View>
//   )
// }
import { View, Text } from 'react-native'
import React from 'react'

export default function OptionCard({option,selectedOption}) {
  return (
    <View style={[{
        padding:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#d3d3d3',
        borderRadius:15
    },selectedOption?.id==option?.id && {
        borderWidth:3
    }]}>
        <View>
        <Text style={{
            fontSize:18,
            fontFamily:'outfit-bold'
        }}>{option.title}</Text>
         <Text style={{
            fontSize:14,
            fontFamily:'outfit-bold',
            color:'#333eee'
        }}>{option.desc}</Text>
        </View>
        <Text style={{
            fontSize:30
        }}>
            {option.icon}
        </Text>
    </View>
  )
}