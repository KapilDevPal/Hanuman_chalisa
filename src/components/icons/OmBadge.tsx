import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Text } from 'react-native';

interface OmBadgeProps {
    size?: number;
    color?: string;
    glyphColor?: string;
}

/** A circular sunburst badge with the ॐ glyph — used for invocation / meditation steps. */
export const OmBadge: React.FC<OmBadgeProps> = ({ size = 32, color = '#FF9933', glyphColor = '#fff' }) => (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size} viewBox="0 0 32 32" style={{ position: 'absolute' }}>
            {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x1 = 16 + Math.cos(angle) * 12;
                const y1 = 16 + Math.sin(angle) * 12;
                const x2 = 16 + Math.cos(angle) * 15.5;
                const y2 = 16 + Math.sin(angle) * 15.5;
                return (
                    <Circle
                        key={i}
                        cx={(x1 + x2) / 2}
                        cy={(y1 + y2) / 2}
                        r={0.9}
                        fill={color}
                        opacity={0.55}
                    />
                );
            })}
            <Circle cx="16" cy="16" r="12.5" fill={color} />
        </Svg>
        <Text style={{ fontSize: size * 0.5, color: glyphColor, fontWeight: '900' }}>ॐ</Text>
    </View>
);
