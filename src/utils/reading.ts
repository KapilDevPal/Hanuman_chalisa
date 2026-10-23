import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export const MIN_FONT = 14;
export const MAX_FONT = 34;

/** Converts a ScrollView scroll event into 0..1 reading progress. */
export const scrollProgress = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const scrollable = contentSize.height - layoutMeasurement.height;
    if (scrollable <= 0) return 0;
    return Math.min(Math.max(contentOffset.y / scrollable, 0), 1);
};
