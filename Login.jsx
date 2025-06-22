import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Colors = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
};

export default function Login() {
  const router = useRouter();

  return (
    <View style={{
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
      <Image
        source={require('./../assets/images/Travel_image.jpeg')}
        style={{ width: '100%', height: 450 }}
      />

      <View style={styles.container}>
        <Text style={styles.text}>AI Travel Planner</Text>
        <Text style={{ padding: 20, textAlign: 'center' }}>
          Discover your next adventure effortlessly. Travel smarter with AI driven insight
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/auth/signin')}
      >
        <Text
          style={{
            borderRadius: 70,
            padding: 15,
            textAlign: 'center',
            backgroundColor: Colors.BLACK,
            color: Colors.WHITE,
            fontSize: 17,
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginTop: 20,
  },
  container: {
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  button: {
    backgroundColor: Colors.WHITE,
    padding: 20, // reduced padding for the button
  },
});
