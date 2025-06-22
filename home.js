import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
    
    // Redirect to Payment page immediately
    useEffect(() => {
        navigation.navigate('Payment');
    }, []);
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Trip Planner</Text>
            
            <TouchableOpacity onPress={() => navigation.navigate('Location')} style={styles.button}>
                <Text style={styles.buttonText}>Location</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button}>
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Payment')} style={styles.button}>
                <Text style={styles.buttonText}>Payment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Feedback')} style={styles.button}>
                <Text style={styles.buttonText}>Feedback</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Music')} style={styles.button}>
                <Text style={styles.buttonText}>Music</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        marginVertical: 10,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
};

export default HomeScreen;