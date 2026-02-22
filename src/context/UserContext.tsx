import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DailyJaap {
    date: string; // YYYY-MM-DD
    count: number;
}

interface Sankalp {
    active: boolean;
    startDate: string | null;
    duration: number; // 11, 21, 40
    daysCompleted: number;
}

interface UserContextProps {
    jaapCount: number;
    incrementJaap: (amount?: number) => void;
    resetDailyJaap: () => void;
    history: DailyJaap[];
    sankalp: Sankalp;
    startSankalp: (duration: number) => void;
    updateSankalpProgress: () => void;
    resetSankalp: () => void;
    isLoading: boolean;
}

const UserContext = createContext<UserContextProps>({
    jaapCount: 0,
    incrementJaap: () => { },
    resetDailyJaap: () => { },
    history: [],
    sankalp: { active: false, startDate: null, duration: 0, daysCompleted: 0 },
    startSankalp: () => { },
    updateSankalpProgress: () => { },
    resetSankalp: () => { },
    isLoading: true,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [jaapCount, setJaapCount] = useState(0);
    const [history, setHistory] = useState<DailyJaap[]>([]);
    const [sankalp, setSankalp] = useState<Sankalp>({
        active: false,
        startDate: null,
        duration: 0,
        daysCompleted: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUserData();
    }, []);

    const getTodayDate = () => new Date().toISOString().split('T')[0];

    const loadUserData = async () => {
        try {
            const storedJaap = await AsyncStorage.getItem('jaap_count');
            const storedHistory = await AsyncStorage.getItem('jaap_history');
            const storedSankalp = await AsyncStorage.getItem('user_sankalp');
            const lastDate = await AsyncStorage.getItem('last_active_date');

            if (storedJaap) setJaapCount(parseInt(storedJaap, 10));
            if (storedHistory) setHistory(JSON.parse(storedHistory));
            if (storedSankalp) setSankalp(JSON.parse(storedSankalp));

            // Check if it's a new day to reset daily count, but keep history? 
            // User request says "Save daily counts locally". 
            // Usually "Jaap Counter" is for the current session or day.
            // Let's assume jaapCount is "Today's Count".

            const today = getTodayDate();
            if (lastDate !== today) {
                setJaapCount(0); // Reset for new day
                await AsyncStorage.setItem('last_active_date', today);
            }

        } catch (error) {
            console.error('Failed to load user data', error);
        } finally {
            setIsLoading(false);
        }
    };

    const incrementJaap = async (amount: number = 1) => {
        const newCount = jaapCount + amount;
        setJaapCount(newCount);
        await AsyncStorage.setItem('jaap_count', newCount.toString());

        // Update detailed history for today
        const today = getTodayDate();
        const existingEntryIndex = history.findIndex(h => h.date === today);
        let newHistory = [...history];
        if (existingEntryIndex >= 0) {
            newHistory[existingEntryIndex].count = newCount;
        } else {
            newHistory.push({ date: today, count: newCount });
        }
        setHistory(newHistory);
        await AsyncStorage.setItem('jaap_history', JSON.stringify(newHistory));
    };

    const resetDailyJaap = async () => {
        setJaapCount(0);
        await AsyncStorage.setItem('jaap_count', '0');
    };

    const startSankalp = async (duration: number) => {
        const newSankalp = {
            active: true,
            startDate: getTodayDate(),
            duration,
            daysCompleted: 0,
        };
        setSankalp(newSankalp);
        await AsyncStorage.setItem('user_sankalp', JSON.stringify(newSankalp));
    };

    const updateSankalpProgress = async () => {
        // Logic to check if daily goal met can be added here
        // For now, manual or auto increment based on some trigger
        if (!sankalp.active) return;

        const newSankalp = { ...sankalp, daysCompleted: sankalp.daysCompleted + 1 };
        setSankalp(newSankalp);
        await AsyncStorage.setItem('user_sankalp', JSON.stringify(newSankalp));
    };

    const resetSankalp = async () => {
        const emptySankalp = { active: false, startDate: null, duration: 0, daysCompleted: 0 };
        setSankalp(emptySankalp);
        await AsyncStorage.setItem('user_sankalp', JSON.stringify(emptySankalp));
    };

    return (
        <UserContext.Provider
            value={{
                jaapCount,
                incrementJaap,
                resetDailyJaap,
                history,
                sankalp,
                startSankalp,
                updateSankalpProgress,
                resetSankalp,
                isLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
