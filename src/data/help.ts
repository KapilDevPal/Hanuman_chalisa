/**
 * Content for the Help & Guide screen: why each feature exists and how to use it.
 * `route` is passed to navigation.navigate() from the More stack.
 */
type Lang = 'en' | 'hi' | 'pa';

interface HelpText {
    title: string;
    why: string;
    how: string[];
}

export interface HelpTopic {
    id: string;
    icon: string;
    route: [string, object?];
    text: Record<Lang, HelpText>;
}

export const HELP_INTRO: Record<Lang, string> = {
    en: 'This app helps you build a daily practice of devotion to Shri Hanuman: read and listen to the Chalisa in your own language, count your jaap, keep a sankalp, and save the mantras that matter to you. Everything stays on your phone.',
    hi: 'यह ऐप श्री हनुमान जी की दैनिक भक्ति में आपकी मदद करता है: अपनी भाषा में चालीसा पढ़ें और सुनें, जाप गिनें, संकल्प लें और अपने प्रिय मंत्र सहेजें। सब कुछ आपके फ़ोन पर ही रहता है।',
    pa: 'ਇਹ ਐਪ ਸ਼੍ਰੀ ਹਨੁਮਾਨ ਜੀ ਦੀ ਰੋਜ਼ਾਨਾ ਭਗਤੀ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰਦਾ ਹੈ: ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਚਾਲੀਸਾ ਪੜ੍ਹੋ ਅਤੇ ਸੁਣੋ, ਜਾਪ ਗਿਣੋ, ਸੰਕਲਪ ਲਓ ਅਤੇ ਆਪਣੇ ਮੰਤਰ ਸੰਭਾਲੋ। ਸਭ ਕੁਝ ਤੁਹਾਡੇ ਫ਼ੋਨ ਤੇ ਹੀ ਰਹਿੰਦਾ ਹੈ।',
};

export const HELP_TOPICS: HelpTopic[] = [
    {
        id: 'chalisa',
        icon: 'book-outline',
        route: ['Chalisa'],
        text: {
            en: {
                title: 'Read Hanuman Chalisa',
                why: 'Reading the Chalisa daily is the heart of the practice. Reading it in the script you know best helps you pronounce and understand every chaupai.',
                how: [
                    'Open the Chalisa tab at the bottom.',
                    'Tap the language button (e.g. "EN English") to choose from 13 languages. Your choice is remembered.',
                    'Use − and + to make the text smaller or bigger.',
                    'The thin bar at the top shows how far you have read.',
                ],
            },
            hi: {
                title: 'हनुमान चालीसा पढ़ें',
                why: 'प्रतिदिन चालीसा का पाठ भक्ति का मूल है। अपनी जानी-पहचानी लिपि में पढ़ने से हर चौपाई का उच्चारण और अर्थ समझना आसान होता है।',
                how: [
                    'नीचे "चालीसा" टैब खोलें।',
                    'भाषा बटन (जैसे "HI हिन्दी") दबाकर 13 भाषाओं में से चुनें। आपकी पसंद याद रखी जाती है।',
                    '− और + से अक्षर छोटे या बड़े करें।',
                    'ऊपर की पतली पट्टी दिखाती है कि आपने कितना पढ़ लिया है।',
                ],
            },
            pa: {
                title: 'ਹਨੁਮਾਨ ਚਾਲੀਸਾ ਪੜ੍ਹੋ',
                why: 'ਰੋਜ਼ਾਨਾ ਚਾਲੀਸਾ ਦਾ ਪਾਠ ਭਗਤੀ ਦਾ ਮੂਲ ਹੈ। ਆਪਣੀ ਜਾਣੀ-ਪਛਾਣੀ ਲਿਪੀ ਵਿੱਚ ਪੜ੍ਹਨ ਨਾਲ ਹਰ ਚੌਪਾਈ ਦਾ ਉਚਾਰਣ ਅਤੇ ਅਰਥ ਸਮਝਣਾ ਆਸਾਨ ਹੁੰਦਾ ਹੈ।',
                how: [
                    'ਹੇਠਾਂ "ਚਾਲੀਸਾ" ਟੈਬ ਖੋਲ੍ਹੋ।',
                    'ਭਾਸ਼ਾ ਬਟਨ ਦਬਾ ਕੇ 13 ਭਾਸ਼ਾਵਾਂ ਵਿੱਚੋਂ ਚੁਣੋ। ਤੁਹਾਡੀ ਚੋਣ ਯਾਦ ਰੱਖੀ ਜਾਂਦੀ ਹੈ।',
                    '− ਅਤੇ + ਨਾਲ ਅੱਖਰ ਛੋਟੇ ਜਾਂ ਵੱਡੇ ਕਰੋ।',
                    'ਉੱਪਰਲੀ ਪਤਲੀ ਪੱਟੀ ਦੱਸਦੀ ਹੈ ਕਿ ਤੁਸੀਂ ਕਿੰਨਾ ਪੜ੍ਹ ਲਿਆ ਹੈ।',
                ],
            },
        },
    },
    {
        id: 'audio',
        icon: 'headset-outline',
        route: ['Home', { screen: 'Audio' }],
        text: {
            en: {
                title: 'Listen to the Chalisa',
                why: 'Listening while you read helps you learn the tune and rhythm, and lets you take part even while travelling or resting.',
                how: [
                    'On Home, tap the large "Listen Now" card.',
                    'Use play / pause and the skip buttons to move through the recitation.',
                    'Tap the arrow at the top to close the player; playback keeps going.',
                ],
            },
            hi: {
                title: 'चालीसा सुनें',
                why: 'पढ़ते समय सुनने से लय और धुन सीखने में मदद मिलती है, और यात्रा या आराम करते समय भी आप पाठ से जुड़ सकते हैं।',
                how: [
                    'होम पर बड़े "सुनें" कार्ड को दबाएँ।',
                    'चलाएँ / रोकें और आगे-पीछे के बटन से पाठ में आगे बढ़ें।',
                    'प्लेयर बंद करने के लिए ऊपर का तीर दबाएँ; ऑडियो चलता रहेगा।',
                ],
            },
            pa: {
                title: 'ਚਾਲੀਸਾ ਸੁਣੋ',
                why: 'ਪੜ੍ਹਦੇ ਸਮੇਂ ਸੁਣਨ ਨਾਲ ਲੈਅ ਅਤੇ ਧੁਨ ਸਿੱਖਣ ਵਿੱਚ ਮਦਦ ਮਿਲਦੀ ਹੈ, ਅਤੇ ਸਫ਼ਰ ਜਾਂ ਆਰਾਮ ਵੇਲੇ ਵੀ ਤੁਸੀਂ ਪਾਠ ਨਾਲ ਜੁੜ ਸਕਦੇ ਹੋ।',
                how: [
                    'ਹੋਮ ਤੇ ਵੱਡੇ "ਹੁਣ ਸੁਣੋ" ਕਾਰਡ ਨੂੰ ਦਬਾਓ।',
                    'ਚਲਾਓ / ਰੋਕੋ ਅਤੇ ਅੱਗੇ-ਪਿੱਛੇ ਬਟਨਾਂ ਨਾਲ ਪਾਠ ਵਿੱਚ ਅੱਗੇ ਵਧੋ।',
                    'ਪਲੇਅਰ ਬੰਦ ਕਰਨ ਲਈ ਉੱਪਰਲਾ ਤੀਰ ਦਬਾਓ; ਆਡੀਓ ਚੱਲਦਾ ਰਹੇਗਾ।',
                ],
            },
        },
    },
    {
        id: 'jaap',
        icon: 'radio-button-on-outline',
        route: ['Jaap'],
        text: {
            en: {
                title: 'Jaap counter',
                why: 'Counting each repetition keeps your mind on the mantra instead of on the count, just like a mala.',
                how: [
                    'Open the Jaap tab and pick your mantra (Ram, Om, Hanuman…).',
                    'Choose a round goal: 11, 21, 51, 108 or 1008.',
                    'Tap the big circle once for every chant. The phone vibrates when a round is complete.',
                    "The ↻ button resets today's count (it asks first).",
                ],
            },
            hi: {
                title: 'जाप गणना',
                why: 'हर जाप की गिनती ऐप रखता है, ताकि माला की तरह आपका मन गिनती पर नहीं, मंत्र पर रहे।',
                how: [
                    '"जाप" टैब खोलें और अपना मंत्र चुनें (राम, ॐ, हनुमान…)।',
                    'राउंड का लक्ष्य चुनें: 11, 21, 51, 108 या 1008।',
                    'हर जाप पर बड़े गोले को एक बार दबाएँ। राउंड पूरा होने पर फ़ोन वाइब्रेट करेगा।',
                    '↻ बटन आज की गिनती शून्य करता है (पहले पूछता है)।',
                ],
            },
            pa: {
                title: 'ਜਾਪ ਗਿਣਤੀ',
                why: 'ਹਰ ਜਾਪ ਦੀ ਗਿਣਤੀ ਐਪ ਰੱਖਦਾ ਹੈ, ਤਾਂ ਜੋ ਮਾਲਾ ਵਾਂਗ ਤੁਹਾਡਾ ਮਨ ਗਿਣਤੀ ਤੇ ਨਹੀਂ, ਮੰਤਰ ਤੇ ਰਹੇ।',
                how: [
                    '"ਜਾਪ" ਟੈਬ ਖੋਲ੍ਹੋ ਅਤੇ ਆਪਣਾ ਮੰਤਰ ਚੁਣੋ (ਰਾਮ, ॐ, ਹਨੁਮਾਨ…)।',
                    'ਗੇੜ ਦਾ ਟੀਚਾ ਚੁਣੋ: 11, 21, 51, 108 ਜਾਂ 1008।',
                    'ਹਰ ਜਾਪ ਤੇ ਵੱਡੇ ਗੋਲੇ ਨੂੰ ਇੱਕ ਵਾਰ ਦਬਾਓ। ਗੇੜ ਪੂਰਾ ਹੋਣ ਤੇ ਫ਼ੋਨ ਵਾਈਬ੍ਰੇਟ ਕਰੇਗਾ।',
                    '↻ ਬਟਨ ਅੱਜ ਦੀ ਗਿਣਤੀ ਸਿਫ਼ਰ ਕਰਦਾ ਹੈ (ਪਹਿਲਾਂ ਪੁੱਛਦਾ ਹੈ)।',
                ],
            },
        },
    },
    {
        id: 'sankalp',
        icon: 'flag-outline',
        route: ['Home', { screen: 'Sankalp' }],
        text: {
            en: {
                title: 'Sankalp (vow)',
                why: 'A sankalp is a promise to recite the Chalisa every day for a set number of days. Tracking it keeps you consistent.',
                how: [
                    'On Home, tap the Sankalp tile.',
                    'Choose 11, 21 or 40 days and confirm your pledge.',
                    'Each day after your reading, tap "Mark Today Complete".',
                ],
            },
            hi: {
                title: 'संकल्प',
                why: 'संकल्प तय दिनों तक रोज़ चालीसा पढ़ने का प्रण है। इसे ट्रैक करने से नियमितता बनी रहती है।',
                how: [
                    'होम पर संकल्प टाइल दबाएँ।',
                    '11, 21 या 40 दिन चुनें और संकल्प की पुष्टि करें।',
                    'रोज़ पाठ के बाद "आज का पूर्ण अंकित करें" दबाएँ।',
                ],
            },
            pa: {
                title: 'ਸੰਕਲਪ',
                why: 'ਸੰਕਲਪ ਤੈਅ ਦਿਨਾਂ ਤੱਕ ਰੋਜ਼ ਚਾਲੀਸਾ ਪੜ੍ਹਨ ਦਾ ਪ੍ਰਣ ਹੈ। ਇਸਨੂੰ ਟਰੈਕ ਕਰਨ ਨਾਲ ਨਿਯਮਿਤਤਾ ਬਣੀ ਰਹਿੰਦੀ ਹੈ।',
                how: [
                    'ਹੋਮ ਤੇ ਸੰਕਲਪ ਟਾਈਲ ਦਬਾਓ।',
                    '11, 21 ਜਾਂ 40 ਦਿਨ ਚੁਣੋ ਅਤੇ ਸੰਕਲਪ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।',
                    'ਰੋਜ਼ ਪਾਠ ਤੋਂ ਬਾਅਦ "ਅੱਜ ਦਾ ਮੁਕੰਮਲ ਅੰਕਿਤ ਕਰੋ" ਦਬਾਓ।',
                ],
            },
        },
    },
    {
        id: 'stats',
        icon: 'stats-chart-outline',
        route: ['Dashboard'],
        text: {
            en: {
                title: 'Stats',
                why: 'Seeing your streak and monthly total is a gentle reminder to keep going.',
                how: [
                    'Open the Stats tab.',
                    'Streak counts the days in a row you have done jaap.',
                    'Recent Journey lists your last 7 days.',
                ],
            },
            hi: {
                title: 'आँकड़े',
                why: 'अपना क्रम और महीने का कुल जाप देखना आगे बढ़ते रहने की प्रेरणा देता है।',
                how: [
                    '"आँकड़े" टैब खोलें।',
                    'क्रम बताता है कि आपने लगातार कितने दिन जाप किया।',
                    'हालिया यात्रा में पिछले 7 दिन दिखते हैं।',
                ],
            },
            pa: {
                title: 'ਅੰਕੜੇ',
                why: 'ਆਪਣਾ ਕ੍ਰਮ ਅਤੇ ਮਹੀਨੇ ਦਾ ਕੁੱਲ ਜਾਪ ਵੇਖਣਾ ਅੱਗੇ ਵਧਦੇ ਰਹਿਣ ਦੀ ਪ੍ਰੇਰਨਾ ਦਿੰਦਾ ਹੈ।',
                how: [
                    '"ਅੰਕੜੇ" ਟੈਬ ਖੋਲ੍ਹੋ।',
                    'ਕ੍ਰਮ ਦੱਸਦਾ ਹੈ ਕਿ ਤੁਸੀਂ ਲਗਾਤਾਰ ਕਿੰਨੇ ਦਿਨ ਜਾਪ ਕੀਤਾ।',
                    'ਤਾਜ਼ਾ ਯਾਤਰਾ ਵਿੱਚ ਪਿਛਲੇ 7 ਦਿਨ ਦਿਖਦੇ ਹਨ।',
                ],
            },
        },
    },
    {
        id: 'library',
        icon: 'library-outline',
        route: ['Home', { screen: 'Library' }],
        text: {
            en: {
                title: 'Spiritual Library',
                why: 'Aarti, Ashtak, Bajrang Baan, Sundarkand and more, all in one place for daily or special-day worship.',
                how: [
                    'On Home, tap "View All" next to Spiritual Library.',
                    'Tap any text to read it. Text size works just like the Chalisa.',
                ],
            },
            hi: {
                title: 'आध्यात्मिक पुस्तकालय',
                why: 'आरती, अष्टक, बजरंग बाण, सुंदरकांड और भी बहुत कुछ — रोज़ या विशेष दिनों की पूजा के लिए एक ही जगह।',
                how: [
                    'होम पर आध्यात्मिक पुस्तकालय के पास "सभी देखें" दबाएँ।',
                    'कोई भी पाठ खोलकर पढ़ें। अक्षर का आकार चालीसा की तरह बदल सकते हैं।',
                ],
            },
            pa: {
                title: 'ਅਧਿਆਤਮਿਕ ਪੁਸਤਕਾਲਯ',
                why: 'ਆਰਤੀ, ਅਸ਼ਟਕ, ਬਜਰੰਗ ਬਾਣ, ਸੁੰਦਰਕਾਂਡ ਅਤੇ ਹੋਰ — ਰੋਜ਼ਾਨਾ ਜਾਂ ਖ਼ਾਸ ਦਿਨਾਂ ਦੀ ਪੂਜਾ ਲਈ ਇੱਕੋ ਥਾਂ।',
                how: [
                    'ਹੋਮ ਤੇ ਅਧਿਆਤਮਿਕ ਪੁਸਤਕਾਲਯ ਕੋਲ "ਸਭ ਵੇਖੋ" ਦਬਾਓ।',
                    'ਕੋਈ ਵੀ ਪਾਠ ਖੋਲ੍ਹ ਕੇ ਪੜ੍ਹੋ। ਅੱਖਰਾਂ ਦਾ ਆਕਾਰ ਚਾਲੀਸਾ ਵਾਂਗ ਬਦਲ ਸਕਦੇ ਹੋ।',
                ],
            },
        },
    },
    {
        id: 'notes',
        icon: 'images-outline',
        route: ['Notes'],
        text: {
            en: {
                title: 'My Notes & mantra photos',
                why: 'Keep photos of mantras, stotras or a guru\'s instructions and read them anytime, even offline. Notes never leave your phone.',
                how: [
                    'More → My Notes, then tap + to create a note.',
                    'Add a title, your text and one or more photos, then Save.',
                    'Open a note to see its photos as a gallery, or switch to the Gallery tab to see every photo.',
                    'Tap a photo to view it full screen. Swipe or use ‹ › for next / previous; pinch or double-tap to zoom.',
                ],
            },
            hi: {
                title: 'मेरे नोट्स और मंत्र की तस्वीरें',
                why: 'मंत्र, स्तोत्र या गुरु के निर्देशों की तस्वीरें रखें और कभी भी, बिना इंटरनेट के भी पढ़ें। नोट्स आपके फ़ोन से बाहर नहीं जाते।',
                how: [
                    'और अधिक → मेरे नोट्स, फिर नया नोट बनाने के लिए + दबाएँ।',
                    'शीर्षक, अपना लेख और एक या अधिक तस्वीरें जोड़कर सहेजें।',
                    'नोट खोलने पर उसकी तस्वीरें गैलरी की तरह दिखती हैं, या सभी तस्वीरों के लिए "गैलरी" टैब चुनें।',
                    'तस्वीर दबाकर फुल स्क्रीन देखें। अगली / पिछली के लिए स्वाइप करें या ‹ › दबाएँ; ज़ूम के लिए दो उँगलियों से फैलाएँ या दो बार टैप करें।',
                ],
            },
            pa: {
                title: 'ਮੇਰੇ ਨੋਟਸ ਅਤੇ ਮੰਤਰ ਦੀਆਂ ਤਸਵੀਰਾਂ',
                why: 'ਮੰਤਰ, ਸਤੋਤਰ ਜਾਂ ਗੁਰੂ ਦੀਆਂ ਹਦਾਇਤਾਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਰੱਖੋ ਅਤੇ ਕਦੇ ਵੀ, ਬਿਨਾਂ ਇੰਟਰਨੈੱਟ ਵੀ ਪੜ੍ਹੋ। ਨੋਟਸ ਤੁਹਾਡੇ ਫ਼ੋਨ ਤੋਂ ਬਾਹਰ ਨਹੀਂ ਜਾਂਦੇ।',
                how: [
                    'ਹੋਰ → ਮੇਰੇ ਨੋਟਸ, ਫਿਰ ਨਵਾਂ ਨੋਟ ਬਣਾਉਣ ਲਈ + ਦਬਾਓ।',
                    'ਸਿਰਲੇਖ, ਆਪਣੀ ਲਿਖਤ ਅਤੇ ਇੱਕ ਜਾਂ ਵੱਧ ਤਸਵੀਰਾਂ ਜੋੜ ਕੇ ਸੰਭਾਲੋ।',
                    'ਨੋਟ ਖੋਲ੍ਹਣ ਤੇ ਉਸਦੀਆਂ ਤਸਵੀਰਾਂ ਗੈਲਰੀ ਵਾਂਗ ਦਿਖਦੀਆਂ ਹਨ, ਜਾਂ ਸਾਰੀਆਂ ਤਸਵੀਰਾਂ ਲਈ "ਗੈਲਰੀ" ਟੈਬ ਚੁਣੋ।',
                    'ਤਸਵੀਰ ਦਬਾ ਕੇ ਪੂਰੀ ਸਕ੍ਰੀਨ ਵੇਖੋ। ਅਗਲੀ / ਪਿਛਲੀ ਲਈ ਸਵਾਈਪ ਕਰੋ ਜਾਂ ‹ › ਦਬਾਓ; ਜ਼ੂਮ ਲਈ ਦੋ ਉਂਗਲਾਂ ਨਾਲ ਫੈਲਾਓ ਜਾਂ ਦੋ ਵਾਰ ਟੈਪ ਕਰੋ।',
                ],
            },
        },
    },
    {
        id: 'wisdom',
        icon: 'chatbox-ellipses-outline',
        route: ['Home', { screen: 'Wisdom' }],
        text: {
            en: {
                title: 'Daily Wisdom',
                why: 'A new thought every day to reflect on, and to share with family and friends.',
                how: [
                    'Read today\'s thought on Home and tap "Read Full".',
                    'Tap Share to send it as an image on WhatsApp or anywhere else.',
                ],
            },
            hi: {
                title: 'आज का ज्ञान',
                why: 'हर दिन मनन के लिए एक नया विचार, जिसे परिवार और मित्रों के साथ बाँट सकें।',
                how: [
                    'होम पर आज का विचार पढ़ें और "पूरा पढ़ें" दबाएँ।',
                    'शेयर दबाकर इसे तस्वीर के रूप में व्हाट्सएप या कहीं भी भेजें।',
                ],
            },
            pa: {
                title: 'ਰੋਜ਼ਾਨਾ ਗਿਆਨ',
                why: 'ਹਰ ਦਿਨ ਸੋਚਣ ਲਈ ਇੱਕ ਨਵਾਂ ਵਿਚਾਰ, ਜੋ ਪਰਿਵਾਰ ਅਤੇ ਦੋਸਤਾਂ ਨਾਲ ਸਾਂਝਾ ਕਰ ਸਕੋ।',
                how: [
                    'ਹੋਮ ਤੇ ਅੱਜ ਦਾ ਵਿਚਾਰ ਪੜ੍ਹੋ ਅਤੇ "ਪੂਰਾ ਪੜ੍ਹੋ" ਦਬਾਓ।',
                    'ਸਾਂਝਾ ਕਰੋ ਦਬਾ ਕੇ ਇਸਨੂੰ ਤਸਵੀਰ ਵਜੋਂ ਵਟਸਐਪ ਜਾਂ ਕਿਤੇ ਵੀ ਭੇਜੋ।',
                ],
            },
        },
    },
    {
        id: 'settings',
        icon: 'settings-outline',
        route: ['MoreSettings'],
        text: {
            en: {
                title: 'Language, dark mode & settings',
                why: 'Make the app comfortable for you: your language, a darker screen for night reading, and your chant name.',
                how: [
                    'Tap the language initials (EN / HI / PA) on Home, or open Settings.',
                    'Turn on Dark Mode in Settings for reading at night.',
                    'The Chalisa reading language is chosen separately, inside the Chalisa tab.',
                ],
            },
            hi: {
                title: 'भाषा, डार्क मोड और सेटिंग',
                why: 'ऐप को अपने अनुसार बनाएँ: अपनी भाषा, रात में पढ़ने के लिए गहरी स्क्रीन और अपना जाप नाम।',
                how: [
                    'होम पर भाषा के अक्षर (EN / HI / PA) दबाएँ, या सेटिंग खोलें।',
                    'रात में पढ़ने के लिए सेटिंग में डार्क मोड चालू करें।',
                    'चालीसा पढ़ने की भाषा अलग से, चालीसा टैब के अंदर चुनी जाती है।',
                ],
            },
            pa: {
                title: 'ਭਾਸ਼ਾ, ਡਾਰਕ ਮੋਡ ਅਤੇ ਸੈਟਿੰਗ',
                why: 'ਐਪ ਨੂੰ ਆਪਣੇ ਅਨੁਸਾਰ ਬਣਾਓ: ਆਪਣੀ ਭਾਸ਼ਾ, ਰਾਤ ਨੂੰ ਪੜ੍ਹਨ ਲਈ ਗੂੜ੍ਹੀ ਸਕ੍ਰੀਨ ਅਤੇ ਆਪਣਾ ਜਾਪ ਨਾਮ।',
                how: [
                    'ਹੋਮ ਤੇ ਭਾਸ਼ਾ ਦੇ ਅੱਖਰ (EN / HI / PA) ਦਬਾਓ, ਜਾਂ ਸੈਟਿੰਗ ਖੋਲ੍ਹੋ।',
                    'ਰਾਤ ਨੂੰ ਪੜ੍ਹਨ ਲਈ ਸੈਟਿੰਗ ਵਿੱਚ ਡਾਰਕ ਮੋਡ ਚਾਲੂ ਕਰੋ।',
                    'ਚਾਲੀਸਾ ਪੜ੍ਹਨ ਦੀ ਭਾਸ਼ਾ ਵੱਖਰੀ, ਚਾਲੀਸਾ ਟੈਬ ਦੇ ਅੰਦਰ ਚੁਣੀ ਜਾਂਦੀ ਹੈ।',
                ],
            },
        },
    },
];
