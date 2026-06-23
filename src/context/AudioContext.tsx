import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { showPlaybackNotification, dismissPlaybackNotification } from '../utils/notifications';
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const { MediaSessionModule } = NativeModules;

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

    // References to keep event listeners updated without resubscribing
    const playRef = useRef<() => Promise<void>>(() => Promise.resolve());
    const pauseRef = useRef<() => Promise<void>>(() => Promise.resolve());
    const seekRef = useRef<(millis: number) => Promise<void>>(() => Promise.resolve());
    const skipFwdRef = useRef<() => Promise<void>>(() => Promise.resolve());
    const skipBwdRef = useRef<() => Promise<void>>(() => Promise.resolve());

    useEffect(() => {
        playRef.current = playAudio;
        pauseRef.current = pauseAudio;
        seekRef.current = seekAudio;
        skipFwdRef.current = skipForward;
        skipBwdRef.current = skipBackward;
    });

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

        // Listen for system media control events on Android
        if (Platform.OS === 'android' && MediaSessionModule) {
            const eventEmitter = new NativeEventEmitter(MediaSessionModule);
            const subscriptions = [
                eventEmitter.addListener('onPlay', () => {
                    playRef.current();
                }),
                eventEmitter.addListener('onPause', () => {
                    pauseRef.current();
                }),
                eventEmitter.addListener('onSeekTo', (pos: number) => {
                    seekRef.current(pos);
                }),
                eventEmitter.addListener('onSkipForward', () => {
                    skipFwdRef.current();
                }),
                eventEmitter.addListener('onSkipBackward', () => {
                    skipBwdRef.current();
                }),
            ];

            return () => {
                if (soundRef.current) {
                    soundRef.current.unloadAsync();
                }
                dismissPlaybackNotification();
                MediaSessionModule.releaseSession();
                subscriptions.forEach(sub => sub.remove());
            };
        }

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

            const { sound: newSound, status } = await Audio.Sound.createAsync(
                require('../../assets/audio/Shree Hanuman Chalisa-(Mr-Jat.in).mp3'),
                { shouldPlay: false }
            );

            soundRef.current = newSound;

            const initialDuration = (status.isLoaded && status.durationMillis) ? status.durationMillis : 0;
            setDuration(initialDuration);

            if (Platform.OS === 'android' && MediaSessionModule) {
                MediaSessionModule.initSession(currentTrackName, "Jai Shri Ram", initialDuration);
                MediaSessionModule.updatePlaybackState(false, 0, initialDuration);
            }

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setPosition(status.positionMillis);
                    setDuration(status.durationMillis || 0);
                    setIsPlaying(status.isPlaying);

                    if (Platform.OS === 'android' && MediaSessionModule) {
                        MediaSessionModule.updatePlaybackState(
                            status.isPlaying,
                            status.positionMillis,
                            status.durationMillis || 0
                        );
                    }

                    if (status.didJustFinish) {
                        // Reset when finished
                        setPosition(0);
                        setIsPlaying(false);
                        dismissPlaybackNotification();
                        newSound.setPositionAsync(0);
                        if (Platform.OS === 'android' && MediaSessionModule) {
                            MediaSessionModule.updatePlaybackState(false, 0, status.durationMillis || 0);
                        }
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
            if (Platform.OS === 'android' && MediaSessionModule) {
                MediaSessionModule.updatePlaybackState(true, position, duration);
            }
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
            if (Platform.OS === 'android' && MediaSessionModule) {
                MediaSessionModule.updatePlaybackState(false, position, duration);
            }
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
            if (Platform.OS === 'android' && MediaSessionModule) {
                MediaSessionModule.updatePlaybackState(isPlaying, nextPosition, duration);
            }
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
            if (Platform.OS === 'android' && MediaSessionModule) {
                MediaSessionModule.updatePlaybackState(isPlaying, prevPosition, duration);
            }
        } catch (error) {
            console.warn("Failed to skip backward:", error);
        }
    };

    const seekAudio = async (millis: number) => {
        if (!soundRef.current) return;
        try {
            await soundRef.current.setPositionAsync(millis);
            setPosition(millis);
            if (Platform.OS === 'android' && MediaSessionModule) {
                MediaSessionModule.updatePlaybackState(isPlaying, millis, duration);
            }
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
