import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
    size?: number;
    color?: string;
}

/** A water droplet — used for the purification step. */
export const DropIcon: React.FC<IconProps> = ({ size = 32, color = '#FF9933' }) => (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <Path
            d="M16 5c4 5.4 8 10.4 8 14.6C24 24.6 20.4 28 16 28S8 24.6 8 19.6C8 15.4 12 10.4 16 5z"
            fill={color}
        />
        <Path
            d="M12.5 20.5c0 2.2 1.6 4 3.7 4.3-2.6-.2-4.7-2.1-4.7-4.9 0-1.5.8-3.1 1.8-4.6-.5 1.7-.8 3.5-.8 5.2z"
            fill="#ffffff40"
        />
    </Svg>
);
