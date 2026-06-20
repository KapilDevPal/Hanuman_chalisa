import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { showPlaybackNotification, dismissPlaybackNotification } from '../utils/notifications';

interface AudioContextType {
    isPlaying: boolean;
    position: number;
    duration: number;
    currentTrackName: string;
    playAudio: () => Promise<void>;
    pauseAudio: () => Promise<void>;
    togglePlayPause: () => Promise<void>;
    skipForward: () => Promise<void>;
    skipBackward: () => Promise<void>;
    seekAudio: (millis: number) => Promise<void>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const soundRef = useRef<Audio.Sound | null>(null);
    const currentTrackName = "Shree Hanuman Chalisa";

    useEffect(() => {
        // Configure background playback mode
        const setupAudioMode = async () => {
            try {
                await Audio.setAudioModeAsync({
                    staysActiveInBackground: true,
                    playsInSilentModeIOS: true,
                    shouldRouteThroughEarpieceAndroid: false,
                });
            } catch (error) {
                console.warn("Failed to set audio mode:", error);
            }
        };

        setupAudioMode();
        loadAudio();

        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
            dismissPlaybackNotification();
        };
    }, []);

    const loadAudio = async () => {
        try {
            if (soundRef.current) {
                await soundRef.current.unloadAsync();
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                require('../../assets/audio/Shree Hanuman Chalisa-(Mr-Jat.in).mp3'),
                { shouldPlay: false }
            );

            soundRef.current = newSound;

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setPosition(status.positionMillis);
                    setDuration(status.durationMillis || 0);
                    setIsPlaying(status.isPlaying);

                    if (status.didJustFinish) {
                        // Reset when finished
                        setPosition(0);
                        setIsPlaying(false);
                        dismissPlaybackNotification();
                        newSound.setPositionAsync(0);
                    }
                }
            });
        } catch (error) {
            console.warn('Error loading sound', error);
        }
    };

    const playAudio = async () => {
        if (!soundRef.current) return;
        try {
            await soundRef.current.playAsync();
            setIsPlaying(true);
            await showPlaybackNotification(true);
        } catch (error) {
            console.warn("Failed to play audio:", error);
        }
    };

    const pauseAudio = async () => {
        if (!soundRef.current) return;
        try {
            await soundRef.current.pauseAsync();
            setIsPlaying(false);
            await showPlaybackNotification(false);
        } catch (error) {
            console.warn("Failed to pause audio:", error);
        }
    };

    const togglePlayPause = async () => {
        if (!soundRef.current) return;
        if (isPlaying) {
            await pauseAudio();
        } else {
            await playAudio();
        }
    };

    const skipForward = async () => {
        if (!soundRef.current) return;
        try {
            const nextPosition = Math.min(position + 10000, duration);
            await soundRef.current.setPositionAsync(nextPosition);
            setPosition(nextPosition);
        } catch (error) {
            console.warn("Failed to skip forward:", error);
        }
    };

    const skipBackward = async () => {
        if (!soundRef.current) return;
        try {
            const prevPosition = Math.max(position - 10000, 0);
            await soundRef.current.setPositionAsync(prevPosition);
            setPosition(prevPosition);
        } catch (error) {
            console.warn("Failed to skip backward:", error);
        }
    };

    const seekAudio = async (millis: number) => {
        if (!soundRef.current) return;
        try {
            await soundRef.current.setPositionAsync(millis);
            setPosition(millis);
        } catch (error) {
            console.warn("Failed to seek:", error);
        }
    };

    return (
        <AudioContext.Provider value={{
            isPlaying,
            position,
            duration,
            currentTrackName,
            playAudio,
            pauseAudio,
            togglePlayPause,
            skipForward,
            skipBackward,
            seekAudio
        }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
