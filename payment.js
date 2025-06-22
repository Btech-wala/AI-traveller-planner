import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';

const PaymentScreen = ({ route }) => {
    const tripDetails = route?.params?.tripDetails || { destination: "Unknown", date: "N/A", fare: 0 };
    const { confirmPayment } = useStripe();
    const [cardDetails, setCardDetails] = useState(null);
    
    const handlePay = async () => {
        if (!cardDetails?.complete) {
            Alert.alert("Invalid Card Details", "Please complete your card details.");
            return;
        }
        
        try {
            // Call backend to create payment intent
            const response = await fetch('https://your-backend.com/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: tripDetails.fare * 100, currency: 'usd' })
            });
            const { clientSecret } = await response.json();
            
            const { paymentIntent, error } = await confirmPayment(clientSecret, { type: 'Card' });
            
            if (error) {
                Alert.alert("Payment Failed", error.message);
            } else if (paymentIntent.status === 'Succeeded') {
                Alert.alert("Payment Successful", "Your trip is booked!");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong.");
        }
    };
    
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Payment</Text>
            <Text>Trip to: {tripDetails.destination}</Text>
            <Text>Date: {tripDetails.date}</Text>
            <Text>Fare: ${tripDetails.fare}</Text>
            
            <CardField
                postalCodeEnabled={false}
                onCardChange={(cardDetails) => setCardDetails(cardDetails)}
                style={{ height: 50, marginVertical: 20 }}
            />
            
            <TouchableOpacity onPress={handlePay} style={{ backgroundColor: 'blue', padding: 15, borderRadius: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Pay Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PaymentScreen;
