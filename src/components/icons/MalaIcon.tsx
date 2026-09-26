import React from 'react';
import Svg, { Circle } from 'react-native-svg';

interface IconProps {
    size?: number;
    color?: string;
}

/** A ring of prayer beads (japa mala) — used for chanting / jaap. */
export const MalaIcon: React.FC<IconProps> = ({ size = 32, color = '#FF9933' }) => {
    const beadCount = 10;
    return (
        <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            {Array.from({ length: beadCount }).map((_, i) => {
                const angle = (i * (360 / beadCount) * Math.PI) / 180 - Math.PI / 2;
                const cx = 16 + Math.cos(angle) * 11;
                const cy = 16 + Math.sin(angle) * 11;
                const isHead = i === 0;
                return (
                    <Circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r={isHead ? 3.2 : 2.4}
                        fill={color}
                        opacity={isHead ? 1 : 0.85}
                    />
                );
            })}
        </Svg>
    );
};
