import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Modal, Animated, TouchableOpacity, useWindowDimensions } from 'react-native';
import { FlatList, Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export interface ViewerImage {
    uri: string;
    caption?: string;
}

const MAX_SCALE = 5;
const DOUBLE_TAP_SCALE = 2.5;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
/** Keeps a zoomed image from being dragged past its own edges. */
const clampOffset = (offset: number, scale: number, size: number) => {
    const max = (size * (scale - 1)) / 2;
    return clamp(offset, -max, max);
};

interface ZoomableImageProps {
    uri: string;
    width: number;
    height: number;
    isActive: boolean;
    onZoomChange: (zoomed: boolean) => void;
    onSingleTap: () => void;
}

/** One page: pinch to zoom, drag while zoomed, double-tap to toggle zoom. */
const ZoomableImage: React.FC<ZoomableImageProps> = ({ uri, width, height, isActive, onZoomChange, onSingleTap }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const g = useRef({ scale: 1, startScale: 1, x: 0, y: 0, startX: 0, startY: 0 }).current;
    const [zoomed, setZoomed] = useState(false);

    const apply = () => {
        scale.setValue(g.scale);
        translateX.setValue(g.x);
        translateY.setValue(g.y);
    };

    const setZoomState = (next: boolean) => {
        setZoomed(next);
        onZoomChange(next);
    };

    const animateTo = (nextScale: number, x: number, y: number) => {
        g.scale = nextScale;
        g.x = x;
        g.y = y;
        Animated.parallel([
            Animated.spring(scale, { toValue: nextScale, useNativeDriver: true, friction: 8 }),
            Animated.spring(translateX, { toValue: x, useNativeDriver: true, friction: 8 }),
            Animated.spring(translateY, { toValue: y, useNativeDriver: true, friction: 8 }),
        ]).start();
        setZoomState(nextScale > 1);
    };

    // Reset zoom when the user moves to another photo
    useEffect(() => {
        if (!isActive && g.scale !== 1) {
            g.scale = 1; g.x = 0; g.y = 0;
            apply();
            setZoomed(false);
        }
    }, [isActive]);

    const gesture = useMemo(() => {
        const pinch = Gesture.Pinch()
            .runOnJS(true)
            .onStart(() => { g.startScale = g.scale; })
            .onUpdate(e => {
                g.scale = clamp(g.startScale * e.scale, 1, MAX_SCALE);
                g.x = clampOffset(g.x, g.scale, width);
                g.y = clampOffset(g.y, g.scale, height);
                apply();
            })
            .onEnd(() => {
                if (g.scale < 1.05) animateTo(1, 0, 0);
                else setZoomState(true);
            });

        const pan = Gesture.Pan()
            .runOnJS(true)
            .enabled(zoomed)
            .averageTouches(true)
            .onStart(() => { g.startX = g.x; g.startY = g.y; })
            .onUpdate(e => {
                g.x = clampOffset(g.startX + e.translationX, g.scale, width);
                g.y = clampOffset(g.startY + e.translationY, g.scale, height);
                apply();
            });

        const doubleTap = Gesture.Tap()
            .runOnJS(true)
            .numberOfTaps(2)
            .onEnd(e => {
                if (g.scale > 1) {
                    animateTo(1, 0, 0);
                } else {
                    // Zoom towards the tapped point
                    const x = clampOffset((width / 2 - e.x) * (DOUBLE_TAP_SCALE - 1), DOUBLE_TAP_SCALE, width);
                    const y = clampOffset((height / 2 - e.y) * (DOUBLE_TAP_SCALE - 1), DOUBLE_TAP_SCALE, height);
                    animateTo(DOUBLE_TAP_SCALE, x, y);
                }
            });

        const singleTap = Gesture.Tap().runOnJS(true).onEnd(() => onSingleTap());

        return Gesture.Simultaneous(pinch, pan, Gesture.Exclusive(doubleTap, singleTap));
    }, [zoomed, width, height, onSingleTap]);

    return (
        <GestureDetector gesture={gesture}>
            <View style={{ width, height, overflow: 'hidden', justifyContent: 'center' }} collapsable={false}>
                <Animated.Image
                    source={{ uri }}
                    resizeMode="contain"
                    style={{ width, height, transform: [{ translateX }, { translateY }, { scale }] }}
                />
            </View>
        </GestureDetector>
    );
};

interface ImageViewerProps {
    visible: boolean;
    images: ViewerImage[];
    initialIndex?: number;
    onClose: () => void;
}

/** Full-screen photo viewer: swipe or use arrows for next / previous, pinch or double-tap to zoom. */
export const ImageViewer: React.FC<ImageViewerProps> = ({ visible, images, initialIndex = 0, onClose }) => {
    const { width, height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const listRef = useRef<FlatList<ViewerImage>>(null);
    const [index, setIndex] = useState(initialIndex);
    const [zoomed, setZoomed] = useState(false);
    const [showControls, setShowControls] = useState(true);

    useEffect(() => {
        if (visible) {
            setIndex(initialIndex);
            setZoomed(false);
            setShowControls(true);
        }
    }, [visible, initialIndex]);

    const goTo = (next: number) => {
        if (next < 0 || next >= images.length) return;
        setZoomed(false);
        setIndex(next);
        listRef.current?.scrollToIndex({ index: next, animated: true });
    };

    const toggleControls = useMemo(() => () => setShowControls(v => !v), []);

    const current = images[index];
    const roundButton = (icon: 'chevron-back' | 'chevron-forward', onPress: () => void, disabled: boolean) => (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
            accessibilityLabel={icon === 'chevron-back' ? 'Previous photo' : 'Next photo'}
            style={{
                width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.16)',
                alignItems: 'center', justifyContent: 'center', opacity: disabled ? 0.3 : 1,
            }}
        >
            <Ionicons name={icon} size={26} color="#FFFFFF" />
        </TouchableOpacity>
    );

    return (
        <Modal visible={visible} animationType="fade" onRequestClose={onClose} statusBarTranslucent navigationBarTranslucent>
            <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000000' }}>
                <FlatList
                    ref={listRef}
                    data={images}
                    horizontal
                    pagingEnabled
                    scrollEnabled={!zoomed}
                    showsHorizontalScrollIndicator={false}
                    initialScrollIndex={initialIndex}
                    getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
                    keyExtractor={(item, i) => `${item.uri}_${i}`}
                    onMomentumScrollEnd={e => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
                    renderItem={({ item, index: i }) => (
                        <ZoomableImage
                            uri={item.uri}
                            width={width}
                            height={height}
                            isActive={i === index}
                            onZoomChange={setZoomed}
                            onSingleTap={toggleControls}
                        />
                    )}
                />

                {showControls && (
                    <>
                        {/* Top bar */}
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: 'absolute', top: 0, left: 0, right: 0, paddingTop: insets.top + 8, paddingHorizontal: 16, paddingBottom: 12,
                                flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.45)',
                            }}
                        >
                            <TouchableOpacity onPress={onClose} hitSlop={10} accessibilityLabel="Close">
                                <Ionicons name="close" size={28} color="#FFFFFF" />
                            </TouchableOpacity>
                            <View style={{ flex: 1, marginHorizontal: 12 }}>
                                {!!current?.caption && (
                                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }} numberOfLines={1}>{current.caption}</Text>
                                )}
                            </View>
                            {images.length > 1 && (
                                <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: '600', fontVariant: ['tabular-nums'] }}>
                                    {index + 1} / {images.length}
                                </Text>
                            )}
                        </View>

                        {/* Previous / next */}
                        {images.length > 1 && (
                            <View
                                pointerEvents="box-none"
                                style={{
                                    position: 'absolute', left: 0, right: 0, bottom: insets.bottom + 24, paddingHorizontal: 24,
                                    flexDirection: 'row', justifyContent: 'space-between',
                                }}
                            >
                                {roundButton('chevron-back', () => goTo(index - 1), index === 0)}
                                {roundButton('chevron-forward', () => goTo(index + 1), index === images.length - 1)}
                            </View>
                        )}
                    </>
                )}
            </GestureHandlerRootView>
        </Modal>
    );
};

