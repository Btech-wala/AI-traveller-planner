import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Sound from 'react-native-sound';

const MusicScreen = () => {
    const [sound, setSound] = useState(null);
    
    const playMusic = () => {
        if (sound) {
            sound.stop(() => sound.play());
        } else {
            const newSound = new Sound('https://www.example.com/sample.mp3', null, (error) => {
                if (!error) {
                    newSound.play();
                    setSound(newSound);
                }
            });
        }
    };
    
    const stopMusic = () => {
        if (sound) {
            sound.stop();
        }
    };
    
    const openSpotify = () => {
        const spotifyUrl = 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M';
        Linking.openURL(spotifyUrl);
    };
    
    return (
        <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Music Player</Text>
            
            <TouchableOpacity onPress={playMusic} style={{ backgroundColor: 'green', padding: 15, margin: 10, borderRadius: 10 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Play Music</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={stopMusic} style={{ backgroundColor: 'red', padding: 15, margin: 10, borderRadius: 10 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Stop Music</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={openSpotify} style={{ backgroundColor: 'blue', padding: 15, margin: 10, borderRadius: 10 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Open Spotify</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MusicScreen;
