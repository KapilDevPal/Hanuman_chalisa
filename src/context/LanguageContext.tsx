import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'hi' | 'en' | 'pa';

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextProps>({
    language: 'hi',
    setLanguage: () => { },
    isLoading: true,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('hi');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        try {
            const storedLang = await AsyncStorage.getItem('app_language');
            if (storedLang && (storedLang === 'hi' || storedLang === 'en' || storedLang === 'pa')) {
                setLanguageState(storedLang as Language);
            }
        } catch (error) {
            console.error('Failed to load language', error);
        } finally {
            setIsLoading(false);
        }
    };

    const setLanguage = async (lang: Language) => {
        try {
            setLanguageState(lang);
            await AsyncStorage.setItem('app_language', lang);
        } catch (error) {
            console.error('Failed to save language', error);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, isLoading }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
