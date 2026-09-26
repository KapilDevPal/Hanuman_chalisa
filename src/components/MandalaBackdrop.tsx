import React from 'react';
import Svg, { Circle, G } from 'react-native-svg';

interface MandalaBackdropProps {
    size?: number;
    color?: string;
    style?: any;
}

/** Faint decorative rings, meant to sit in the corner of a gradient hero header. */
export const MandalaBackdrop: React.FC<MandalaBackdropProps> = ({ size = 180, color = '#fff', style }) => (
    <Svg width={size} height={size} viewBox="0 0 200 200" style={style} pointerEvents="none">
        <G opacity={0.12}>
            <Circle cx="100" cy="100" r="95" stroke={color} strokeWidth={2} fill="none" />
            <Circle cx="100" cy="100" r="70" stroke={color} strokeWidth={2} fill="none" />
            <Circle cx="100" cy="100" r="45" stroke={color} strokeWidth={2} fill="none" />
        </G>
        <G opacity={0.16}>
            {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * 22.5 * Math.PI) / 180;
                const cx = 100 + Math.cos(angle) * 82;
                const cy = 100 + Math.sin(angle) * 82;
                return <Circle key={i} cx={cx} cy={cy} r={3} fill={color} />;
            })}
        </G>
    </Svg>
);
