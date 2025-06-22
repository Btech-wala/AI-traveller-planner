import React, { useState } from 'react';
import { View, Text, TextInput, Button, Linking, TouchableOpacity, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Home Screen with Menu
const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
    if (option === 'Logout') {
      alert('Logging out...');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Travel Planner!</Text>
      <Button title="Plan a Trip" onPress={() => navigation.navigate('Trip')} />
      
      {/* 3-dot menu button */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 20, right: 20, padding: 10 }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ fontSize: 24 }}>⋮</Text>
      </TouchableOpacity>
      
      {/* Menu Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Menu</Text>
            <Button title="🎵 Music Info" onPress={() => handleOptionSelect('Music')} />
            <Button title="⚙️ Settings" onPress={() => handleOptionSelect('Settings')} />
            <Button title="🚪 Logout" onPress={() => handleOptionSelect('Logout')} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Booking Information Button */}
      <View style={{ marginTop: 20, padding: 20, backgroundColor: '#f5f5f5', borderRadius: 10 }}>
        <Button title="📅 View Booking Information" onPress={() => navigation.navigate('Booking')} />
      </View>
    </View>
  );
};

// Booking Screen
const BookingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>📅 Booking Information</Text>
    <Text>Destination: Paris</Text>
    <Text>Date: 20th March 2025</Text>
    <Text>Fare: $350</Text>
    <Text>Status: Confirmed</Text>
  </View>
);

const DestinationSearch = () => {
  const [destination, setDestination] = useState('');
  const handleSearch = () => {
    if (destination.trim() !== '') {
      const query = encodeURIComponent(destination);
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
      Linking.openURL(googleMapsUrl);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text>Search Destinations</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', width: '80%', padding: 10, marginVertical: 10, borderRadius: 5 }}
        placeholder="Enter destination..."
        value={destination}
        onChangeText={setDestination}
      />
      <Button title="Search in Google Maps" onPress={handleSearch} />
    </View>
  );
};

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Your Profile</Text>
    <Button title="Edit Profile" onPress={() => alert('Profile Edit Coming Soon!')} />
  </View>
);

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={DestinationSearch} />
        <Tab.Screen name="Booking" component={BookingScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
