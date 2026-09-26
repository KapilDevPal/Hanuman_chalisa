import React from 'react';
import Svg, { Path, Ellipse, Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

interface IconProps {
    size?: number;
    color?: string;
    flameColor?: string;
}

/** A traditional oil lamp (diya) with a flame — used for Aarti. */
export const DiyaIcon: React.FC<IconProps> = ({ size = 32, color = '#FF9933', flameColor = '#FFB347' }) => (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <Defs>
            <RadialGradient id="flameGrad" cx="50%" cy="70%" r="70%">
                <Stop offset="0%" stopColor="#FFF3C4" />
                <Stop offset="55%" stopColor={flameColor} />
                <Stop offset="100%" stopColor="#FF7700" />
            </RadialGradient>
        </Defs>
        {/* Flame */}
        <Path
            d="M16 6c1.6 2.4 2.6 4.3 2.6 6.2 0 1.8-1.2 3-2.6 3s-2.6-1.2-2.6-3c0-1.9 1-3.8 2.6-6.2z"
            fill="url(#flameGrad)"
        />
        {/* Lamp bowl */}
        <Path
            d="M5 17c0-1 .6-1.6 1.5-1.6h19c.9 0 1.5.6 1.5 1.6 0 5-5.2 8.6-11 8.6S5 22 5 17z"
            fill={color}
        />
        <Ellipse cx="16" cy="17" rx="10.5" ry="2.4" fill="#00000018" />
        {/* Base */}
        <Path d="M12 26.6h8l-1.4 2.4h-5.2z" fill={color} opacity={0.85} />
        <Circle cx="16" cy="15.4" r="1.6" fill="#FFDD99" />
    </Svg>
);
