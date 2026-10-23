import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { textList } from '../data/TextLibrary';
import { Screen, Surface, ListRow, IconTile } from '../components/ui';

const libraryIcons: Record<string, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
    hanuman_ashtak: 'shield-sun-outline',
    hanuman_aarti: 'fire',
    sundarkand: 'crown-outline',
    bajrang_baan: 'sword',
    hanuman_raksha_mantra: 'shield-check-outline',
    mangalwar_katha: 'calendar-heart',
    bahuk_path: 'heart-pulse',
    ram_stuti: 'flower-outline',
    panchmukhi_hanuman_kavach: 'shield-account-outline',
    hanuman_gayatri_mantra: 'weather-sunny',
    hanuman_dwadash_naam_stotram: 'format-list-numbered',
};

export const LibraryScreen = () => {
    const navigation = useNavigation<any>();
    const { colors } = useTheme();
    const { T } = useT();

    return (
        <Screen>
            <Text style={{ fontSize: 15, color: colors.textMuted, marginBottom: 20 }}>{T('library_subtitle')}</Text>
            <Surface padded={false}>
                {textList.map((item, index) => (
                    <ListRow
                        key={item.id}
                        icon={
                            <IconTile>
                                <MaterialCommunityIcons name={libraryIcons[item.id] ?? 'book-open-variant'} size={20} color={colors.primary} />
                            </IconTile>
                        }
                        title={item.title}
                        onPress={() => navigation.navigate('Reader', { textId: item.id, title: item.title })}
                        last={index === textList.length - 1}
                    />
                ))}
            </Surface>
        </Screen>
    );
};
