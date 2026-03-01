import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

export const AudioScreen = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        loadAudio();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const loadAudio = async () => {
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
                require('../../assets/audio/Shree Hanuman Chalisa-(Mr-Jat.in).mp3'),
                { shouldPlay: false }
            );
            setSound(newSound);

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setPosition(status.positionMillis);
                    setDuration(status.durationMillis || 0);
                    setIsPlaying(status.isPlaying);
                }
            });
        } catch (error) {
            console.log('Error loading sound', error);
        }
    };

    const handlePlayPause = async () => {
        if (!sound) return;
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    };

    const formatTime = (millis: number) => {
        const totalSeconds = millis / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const skipForward = async () => {
        if (sound) {
            await sound.setPositionAsync(Math.min(position + 10000, duration));
        }
    };

    const skipBackward = async () => {
        if (sound) {
            await sound.setPositionAsync(Math.max(position - 10000, 0));
        }
    };

    return (
        <LinearGradient
            colors={[Colors.primary, '#1a1a1a']}
            style={styles.container}
        >
            <View className="items-center px-8 flex-1 justify-center">
                {/* Cover Art */}
                <View className="shadow-2xl rounded-3xl overflow-hidden mb-12" style={{ elevation: 20 }}>
                    <Image
                        source={require('../../assets/images/hanuman_cover.png')}
                        style={{ width: width * 0.8, height: width * 0.8 }}
                        resizeMode="cover"
                    />
                </View>

                {/* Track Info */}
                <View className="w-full mb-8">
                    <Text className="text-white text-3xl font-bold mb-2">Shree Hanuman Chalisa</Text>
                    <Text className="text-white/60 text-lg uppercase tracking-widest">The Divine Anthem</Text>
                </View>

                {/* Progress Bar */}
                <View className="w-full mb-8">
                    <View className="h-1 bg-white/20 rounded-full w-full overflow-hidden">
                        <View
                            className="h-full bg-white"
                            style={{ width: `${(position / duration) * 100}%` }}
                        />
                    </View>
                    <View className="flex-row justify-between mt-2">
                        <Text className="text-white/40 text-xs">{formatTime(position)}</Text>
                        <Text className="text-white/40 text-xs">{formatTime(duration)}</Text>
                    </View>
                </View>

                {/* Controls */}
                <View className="flex-row items-center justify-between w-full px-6">
                    <TouchableOpacity onPress={skipBackward}>
                        <Ionicons name="play-back" size={40} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handlePlayPause}
                        className="bg-white rounded-full p-4 items-center justify-center"
                    >
                        <Ionicons
                            name={isPlaying ? "pause" : "play"}
                            size={50}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={skipForward}>
                        <Ionicons name="play-forward" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
