import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Animated, Easing, StyleSheet, Dimensions, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import { LanguageProvider } from './src/context/LanguageContext';
import { UserProvider } from './src/context/UserContext';
import { AudioProvider, useAudio } from './src/context/AudioContext';
import AppNavigator from './src/navigation/AppNavigator';
import { scheduleDailyReminder } from './src/utils/notifications';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// ─── Animated Splash Screen ───────────────────────────────────────────────────
function SplashScreen({ onDone }: { onDone: () => void }) {
  // Core animations
  const logoScale  = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleY     = useRef(new Animated.Value(30)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;

  // Pulsing ring
  const ring1 = useRef(new Animated.Value(0.6)).current;
  const ring2 = useRef(new Animated.Value(0.6)).current;
  const ring3 = useRef(new Animated.Value(0.6)).current;

  const startPulse = (anim: Animated.Value, delay: number) => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1.5, duration: 1200, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0.6, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  };

  useEffect(() => {
    // Rings pulse
    startPulse(ring1, 0);
    startPulse(ring2, 400);
    startPulse(ring3, 800);

    // Entrance sequence
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(titleY, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(subtitleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.delay(1200),
      // Fade out
      Animated.timing(containerOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => onDone());
  }, []);

  const ringOpacity = (anim: Animated.Value) =>
    anim.interpolate({ inputRange: [0.6, 1.5], outputRange: [0.35, 0] });

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: containerOpacity, zIndex: 999 }]}>
      <LinearGradient
        colors={['#FF7700', '#FF9933', '#FFB347', '#FFCC80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Background decorative blobs */}
      <View style={[styles.blob, { top: -80, right: -80, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 200, width: 300, height: 300 }]} />
      <View style={[styles.blob, { bottom: -60, left: -60, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 200, width: 240, height: 240 }]} />

      {/* Center content */}
      <View style={styles.center}>

        {/* Pulsing rings */}
        {[ring1, ring2, ring3].map((r, i) => (
          <Animated.View
            key={i}
            style={[
              styles.pulseRing,
              { transform: [{ scale: r }], opacity: ringOpacity(r) },
            ]}
          />
        ))}

        {/* Logo Container */}
        <Animated.View
          style={[
            styles.logoCircle,
            { transform: [{ scale: logoScale }], opacity: logoOpacity },
          ]}
        >
          <Image source={require('./assets/icon.png')} style={styles.logoImage} />
        </Animated.View>

        {/* App name */}
        <Animated.View style={{ transform: [{ translateY: titleY }], opacity: titleOpacity, alignItems: 'center', marginTop: 28 }}>
          <Text style={styles.appName}>Hanuman Chalisa</Text>
          <Text style={styles.appTagline}>Lyrics, Aarti & Jaap</Text>
        </Animated.View>

        {/* Sub text */}
        <Animated.View style={{ opacity: subtitleOpacity, marginTop: 14 }}>
          <Text style={styles.subtext}>Jai Shri Ram 🙏</Text>
        </Animated.View>
      </View>

      {/* Bottom brand */}
      <Animated.View style={[styles.bottomBrand, { opacity: titleOpacity }]}>
        <View style={styles.dot} />
        <Text style={styles.bottomText}>Made with devotion</Text>
        <View style={styles.dot} />
      </Animated.View>
    </Animated.View>
  );
}

// ─── App Content ──────────────────────────────────────────────────────────────
function AppContent() {
  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const actionIdentifier = response.actionIdentifier;
      if (actionIdentifier === 'PAUSE_ACTION') {
        pauseAudio();
      } else if (actionIdentifier === 'PLAY_ACTION') {
        playAudio();
      }
    });
    return () => { subscription.remove(); };
  }, [playAudio, pauseAudio]);

  return <AppNavigator />;
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    scheduleDailyReminder();
  }, []);

  return (
    <LanguageProvider>
      <UserProvider>
        <AudioProvider>
          <StatusBar style="light" />
          {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
          <AppContent />
        </AudioProvider>
      </UserProvider>
    </LanguageProvider>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blob: {
    position: 'absolute',
  },
  pulseRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#fff',
    borderWidth: 3.5,
    borderColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 14,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.3,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.12)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  appTagline: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1.2,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  subtext: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bottomBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 44,
    gap: 8,
  },
  bottomText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
});
