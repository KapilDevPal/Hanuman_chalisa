import React from 'react';
import Svg, { Rect, Line } from 'react-native-svg';

interface IconProps {
    size?: number;
    color?: string;
}

/** A woven seating mat (asana) — used for the seating / posture step. */
export const MatIcon: React.FC<IconProps> = ({ size = 32, color = '#FF9933' }) => (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <Rect x="5" y="11" width="22" height="12" rx="3" fill={color} />
        {[14.5, 18, 21.5].map((y, i) => (
            <Line key={i} x1="7.5" y1={y} x2="24.5" y2={y} stroke="#00000022" strokeWidth={1} />
        ))}
        <Rect x="5" y="11" width="22" height="12" rx="3" stroke="#00000018" strokeWidth={1} fill="none" />
    </Svg>
);
