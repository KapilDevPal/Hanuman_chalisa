// ─── App-wide UI Translations ─────────────────────────────────────────────────
// Add new keys here and use useT() hook in components.

export type Language = 'hi' | 'en' | 'pa';

export const translations = {
  // ── Bottom Nav ──────────────────────────────────────────────────────────────
  nav_home:      { hi: 'होम',       en: 'Home',    pa: 'ਹੋਮ' },
  nav_chalisa:   { hi: 'चालीसा',   en: 'Chalisa', pa: 'ਚਾਲੀਸਾ' },
  nav_jaap:      { hi: 'जाप',      en: 'Jaap',    pa: 'ਜਾਪ' },
  nav_stats:     { hi: 'आँकड़े',   en: 'Stats',   pa: 'ਅੰਕੜੇ' },
  nav_temples:   { hi: 'मंदिर',    en: 'Temples', pa: 'ਮੰਦਰ' },
  nav_more:      { hi: 'और अधिक',  en: 'More',    pa: 'ਹੋਰ' },

  // ── HomeScreen ──────────────────────────────────────────────────────────────
  home_welcome:         { hi: 'भक्त का स्वागत है',  en: 'Welcome Devotee',        pa: 'ਭਗਤ ਦਾ ਸੁਆਗਤ ਹੈ' },
  home_greeting_hi:     { hi: 'जय श्री राम',         en: 'Jai Shri Ram',           pa: 'ਜੈ ਸ਼੍ਰੀ ਰਾਮ' },
  home_daily_wisdom:    { hi: 'आज का ज्ञान',         en: 'Daily Wisdom',           pa: 'ਰੋਜ਼ਾਨਾ ਗਿਆਨ' },
  home_read_full:       { hi: 'पूरा पढ़ें →',         en: 'Read Full →',            pa: 'ਪੂਰਾ ਪੜ੍ਹੋ →' },
  home_listen_now:      { hi: 'सुनें',               en: 'Listen Now',             pa: 'ਹੁਣ ਸੁਣੋ' },
  home_divine_chanting: { hi: 'दिव्य पाठ',           en: 'Divine Chanting',        pa: 'ਦਿਵਯ ਪਾਠ' },
  home_play_audio:      { hi: 'ऑडियो चलाएं',          en: 'Play Audio',             pa: 'ਆਡੀਓ ਚਲਾਓ' },
  home_jaap_today:      { hi: 'आज का जाप',           en: 'Jaap Today',             pa: 'ਅੱਜ ਦਾ ਜਾਪ' },
  home_sankalp_day:     { hi: 'संकल्प दिन',           en: 'Sankalp Day',            pa: 'ਸੰਕਲਪ ਦਿਨ' },
  home_library:         { hi: 'आध्यात्मिक पुस्तकालय', en: 'Spiritual Library',      pa: 'ਅਧਿਆਤਮਿਕ ਪੁਸਤਕਾਲਯ' },
  home_view_all:        { hi: 'सभी देखें',            en: 'View All',               pa: 'ਸਭ ਵੇਖੋ' },
  home_chalisa:         { hi: 'चालीसा',              en: 'Chalisa',                pa: 'ਚਾਲੀਸਾ' },
  home_chalisa_sub:     { hi: 'पढ़ें और जपें',         en: 'Read & Chant',           pa: 'ਪੜ੍ਹੋ ਅਤੇ ਜਪੋ' },
  home_aarti:           { hi: 'आरती',                en: 'Aarti',                  pa: 'ਆਰਤੀ' },
  home_aarti_sub:       { hi: 'भक्ति गीत',            en: 'Devotional Songs',       pa: 'ਭਗਤੀ ਗੀਤ' },
  home_ashtak:          { hi: 'अष्टक',               en: 'Ashtak',                 pa: 'ਅਸ਼ਟਕ' },
  home_ashtak_sub:      { hi: 'आठ श्लोक',             en: 'Eight Verses',           pa: 'ਅੱਠ ਸ਼ਲੋਕ' },
  home_insights:        { hi: 'आध्यात्मिक विश्लेषण',  en: 'Spiritual Insights',     pa: 'ਅਧਿਆਤਮਿਕ ਵਿਸ਼ਲੇਸ਼ਣ' },
  home_way_to_pray:     { hi: 'प्रार्थना विधि',        en: 'Way to Pray',            pa: 'ਪ੍ਰਾਰਥਨਾ ਵਿਧੀ' },
  home_way_to_pray_sub: { hi: 'विधि और अनुष्ठान सीखें', en: 'Learn the vidhi and rituals', pa: 'ਵਿਧੀ ਅਤੇ ਰੀਤਾਂ ਸਿੱਖੋ' },

  // ── JaapScreen ──────────────────────────────────────────────────────────────
  jaap_title:          { hi: 'दैनिक जाप',           en: 'Daily Jaap',        pa: 'ਰੋਜ਼ਾਨਾ ਜਾਪ' },
  jaap_subtitle:       { hi: 'अपने मंत्रों का जाप करें', en: 'Chant & track your mantras', pa: 'ਆਪਣੇ ਮੰਤਰ ਜਪੋ' },
  jaap_chants:         { hi: 'जाप',                 en: 'chants',            pa: 'ਜਾਪ' },
  jaap_this_round:     { hi: 'इस राउंड में',         en: 'this round',        pa: 'ਇਸ ਗੇੜ ਵਿੱਚ' },
  jaap_chanting_name:  { hi: 'जाप का नाम',           en: 'Chanting Name',     pa: 'ਜਾਪ ਦਾ ਨਾਮ' },
  jaap_change:         { hi: 'बदलें',               en: 'Change',            pa: 'ਬਦਲੋ' },
  jaap_select_mantra:  { hi: 'अपना मंत्र चुनें',     en: 'Select Your Mantra', pa: 'ਆਪਣਾ ਮੰਤਰ ਚੁਣੋ' },
  jaap_goal:           { hi: 'लक्ष्य निर्धारित करें', en: 'Set Daily Round Goal', pa: 'ਰੋਜ਼ਾਨਾ ਟੀਚਾ ਨਿਰਧਾਰਿਤ ਕਰੋ' },
  jaap_reset:          { hi: 'गिनती रीसेट करें',     en: 'Reset Counter',     pa: 'ਗਿਣਤੀ ਰੀਸੈੱਟ ਕਰੋ' },
  jaap_tap:            { hi: 'जाप करें',             en: 'Tap to Chant',      pa: 'ਜਾਪ ਕਰੋ' },

  // ── ChalisaScreen ───────────────────────────────────────────────────────────
  chalisa_ending:  { hi: '|| इति श्री हनुमान चालीसा समाप्त ||', en: '|| End of Hanuman Chalisa ||', pa: '|| ਹਨੁਮਾਨ ਚਾਲੀਸਾ ਸਮਾਪਤ ||' },

  // ── LibraryScreen ───────────────────────────────────────────────────────────
  library_title:    { hi: 'दिव्य पुस्तकालय',     en: 'Divine Library',   pa: 'ਦਿਵਯ ਪੁਸਤਕਾਲਯ' },
  library_subtitle: { hi: 'पवित्र ग्रंथ और स्तोत्र', en: 'Explore sacred texts, hymns, and spiritual compositions.', pa: 'ਪਵਿੱਤਰ ਗ੍ਰੰਥ ਅਤੇ ਭਜਨ' },
  library_read:     { hi: 'पवित्र पाठ पढ़ें',     en: 'Read sacred text',  pa: 'ਪਵਿੱਤਰ ਪਾਠ ਪੜ੍ਹੋ' },

  // ── DashboardScreen ─────────────────────────────────────────────────────────
  dash_title:          { hi: 'विश्लेषण',            en: 'Insights',               pa: 'ਵਿਸ਼ਲੇਸ਼ਣ' },
  dash_subtitle:       { hi: 'आपकी आध्यात्मिक यात्रा', en: 'Your spiritual journey at a glance.', pa: 'ਤੁਹਾਡੀ ਅਧਿਆਤਮਿਕ ਯਾਤਰਾ' },
  dash_streak:         { hi: 'क्रम',               en: 'Streak',                 pa: 'ਕ੍ਰਮ' },
  dash_days_active:    { hi: 'सक्रिय दिन',          en: 'Days Active',            pa: 'ਸਕਿਰਿਆ ਦਿਨ' },
  dash_month:          { hi: 'माह',                en: 'Month',                  pa: 'ਮਹੀਨਾ' },
  dash_total_jaap:     { hi: 'कुल जाप',            en: 'Total Jaap',             pa: 'ਕੁੱਲ ਜਾਪ' },
  dash_sankalp:        { hi: 'संकल्प प्रगति',       en: 'Sankalp Progress',       pa: 'ਸੰਕਲਪ ਪ੍ਰਗਤੀ' },
  dash_vow:            { hi: 'आध्यात्मिक प्रण',     en: 'Spiritual Vow',          pa: 'ਅਧਿਆਤਮਿਕ ਪ੍ਰਣ' },
  dash_complete:       { hi: '% पूर्ण',            en: '% Complete',             pa: '% ਮੁਕੰਮਲ' },
  dash_days:           { hi: 'दिन',                en: 'Days',                   pa: 'ਦਿਨ' },
  dash_no_sankalp:     { hi: 'कोई संकल्प नहीं',    en: 'No Active Sankalp',      pa: 'ਕੋਈ ਸੰਕਲਪ ਨਹੀਂ' },
  dash_journey:        { hi: 'हालिया यात्रा',        en: 'Recent Journey',         pa: 'ਤਾਜ਼ਾ ਯਾਤਰਾ' },
  dash_session:        { hi: 'जाप सत्र पूर्ण',      en: 'Completed Jaap session', pa: 'ਜਾਪ ਸੈਸ਼ਨ ਮੁਕੰਮਲ' },
  dash_empty:          { hi: 'आपकी यात्रा जल्द शुरू होगी।', en: 'Your journey begins soon.', pa: 'ਤੁਹਾਡੀ ਯਾਤਰਾ ਜਲਦੀ ਸ਼ੁਰੂ ਹੋਵੇਗੀ।' },

  // ── SettingsScreen ──────────────────────────────────────────────────────────
  settings_title:         { hi: 'सेटिंग',              en: 'Settings',                   pa: 'ਸੈਟਿੰਗ' },
  settings_subtitle:      { hi: 'अपना अनुभव अनुकूलित करें।', en: 'Personalize your devotional experience.', pa: 'ਆਪਣਾ ਅਨੁਭਵ ਅਨੁਕੂਲਿਤ ਕਰੋ।' },
  settings_personal:      { hi: 'व्यक्तिगतकरण',         en: 'Personalization',            pa: 'ਵਿਅਕਤੀਗਤਕਰਨ' },
  settings_chant_name:    { hi: 'जाप का नाम',            en: 'Chant Name (Jaap)',          pa: 'ਜਾਪ ਦਾ ਨਾਮ' },
  settings_chant_hint:    { hi: 'जाप के समय कौन सा नाम लेते हैं? (जैसे RAM, OM)', en: 'What name do you repeat during chanting? (e.g. RAM, OM)', pa: 'ਜਾਪ ਕਰਦੇ ਸਮੇਂ ਕਿਹੜਾ ਨਾਮ ਲੈਂਦੇ ਹੋ? (ਜਿਵੇਂ RAM, OM)' },
  settings_chant_ph:      { hi: 'नाम दर्ज करें',          en: 'Enter Chant Name',           pa: 'ਨਾਮ ਦਰਜ ਕਰੋ' },
  settings_regional:      { hi: 'भाषा सेटिंग',            en: 'Regional Settings',          pa: 'ਭਾਸ਼ਾ ਸੈਟਿੰਗ' },
  settings_about:         { hi: 'ऐप के बारे में',          en: 'About App',                  pa: 'ਐਪ ਬਾਰੇ' },
  settings_version:       { hi: 'संस्करण',                en: 'Version',                    pa: 'ਸੰਸਕਰਣ' },
  settings_build:         { hi: 'बिल्ड',                 en: 'Build',                      pa: 'ਬਿਲਡ' },
  settings_bless:         { hi: 'जय बजरंग बली!',          en: 'Jai Bajrang Bali!',          pa: 'ਜੈ ਬਜਰੰਗ ਬਲੀ!' },
  settings_devotion:      { hi: 'भक्ति भाव से बनाया गया',  en: 'Made with devotion',         pa: 'ਭਗਤੀ ਨਾਲ ਬਣਾਇਆ' },
  settings_hi_label:      { hi: 'हिंदी (Hindi)',           en: 'हिंदी (Hindi)',              pa: 'हिंदी (Hindi)' },
  settings_hi_sub:        { hi: 'देवनागरी लिपि',           en: 'Traditional Hindi presentation', pa: 'ਦੇਵਨਾਗਰੀ ਲਿਪੀ' },
  settings_en_label:      { hi: 'English (अंग्रेज़ी)',     en: 'English (English)',          pa: 'English (ਅੰਗਰੇਜ਼ੀ)' },
  settings_en_sub:        { hi: 'रोमन लिपि में',            en: 'Latin transliterated presentation', pa: 'ਰੋਮਨ ਲਿਪੀ ਵਿੱਚ' },
  settings_pa_label:      { hi: 'ਪੰਜਾਬੀ (Punjabi)',       en: 'ਪੰਜਾਬੀ (Punjabi)',          pa: 'ਪੰਜਾਬੀ (Punjabi)' },
  settings_pa_sub:        { hi: 'ਗੁਰਮੁਖੀ ਲਿਪੀ',           en: 'Gurumukhi presentation',     pa: 'ਗੁਰਮੁਖੀ ਲਿਪੀ' },

  // ── SankalpScreen ───────────────────────────────────────────────────────────
  sankalp_new:          { hi: 'नया संकल्प',            en: 'New Sankalp',         pa: 'ਨਵਾਂ ਸੰਕਲਪ' },
  sankalp_choose:       { hi: 'अनुशासन की अवधि चुनें।', en: 'Choose a duration for your discipline.', pa: 'ਅਨੁਸ਼ਾਸਨ ਦੀ ਮਿਆਦ ਚੁਣੋ।' },
  sankalp_days:         { hi: 'दिन',                   en: 'Days',                pa: 'ਦਿਨ' },
  sankalp_progress:     { hi: 'आपकी संकल्प प्रगति',    en: 'Your Sankalp Progress', pa: 'ਤੁਹਾਡੀ ਸੰਕਲਪ ਪ੍ਰਗਤੀ' },
  sankalp_completed:    { hi: 'संकल्प पूर्ण! जय हनुमान!', en: 'Sankalp Completed! Jai Hanuman!', pa: 'ਸੰਕਲਪ ਮੁਕੰਮਲ! ਜੈ ਹਨੁਮਾਨ!' },
  sankalp_going:        { hi: 'बढ़ते रहें! आप बहुत अच्छा कर रहे हैं।', en: 'Keep going! You are doing great.', pa: 'ਜਾਰੀ ਰੱਖੋ! ਤੁਸੀਂ ਬਹੁਤ ਵਧੀਆ ਕਰ ਰਹੇ ਹੋ।' },
  sankalp_mark:         { hi: 'आज का पूर्ण अंकित करें', en: 'Mark Today Complete', pa: 'ਅੱਜ ਦਾ ਮੁਕੰਮਲ ਅੰਕਿਤ ਕਰੋ' },
  sankalp_abandon:      { hi: 'संकल्प छोड़ें / रीसेट करें', en: 'Abandon / Reset Sankalp', pa: 'ਸੰਕਲਪ ਛੱਡੋ / ਰੀਸੈੱਟ ਕਰੋ' },
  sankalp_confirm:      { hi: 'संकल्प की पुष्टि करें', en: 'Confirm Sankalp', pa: 'ਸੰਕਲਪ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ' },
  sankalp_pledge:       { hi: 'क्या आप {days} दिन हनुमान चालीसा पढ़ने का संकल्प लेते हैं?', en: 'Do you pledge to recite Hanuman Chalisa for {days} days?', pa: 'ਕੀ ਤੁਸੀਂ {days} ਦਿਨ ਹਨੁਮਾਨ ਚਾਲੀਸਾ ਪੜ੍ਹਨ ਦਾ ਸੰਕਲਪ ਲੈਂਦੇ ਹੋ?' },
  sankalp_cancel:       { hi: 'रद्द करें',              en: 'Cancel',            pa: 'ਰੱਦ ਕਰੋ' },
  sankalp_yes_pledge:   { hi: 'हाँ, संकल्प लेता हूँ',   en: 'Yes, I Pledge',     pa: 'ਹਾਂ, ਮੈਂ ਸੰਕਲਪ ਲੈਂਦਾ ਹਾਂ' },
  sankalp_daily_q:      { hi: 'दैनिक पूर्णता',          en: 'Daily Completion',  pa: 'ਰੋਜ਼ਾਨਾ ਮੁਕੰਮਲਤਾ' },
  sankalp_done_today:   { hi: 'क्या आपने आज पाठ पूरा किया?', en: 'Have you completed your reading today?', pa: 'ਕੀ ਤੁਸੀਂ ਅੱਜ ਪਾਠ ਮੁਕੰਮਲ ਕੀਤਾ?' },
  sankalp_no:           { hi: 'नहीं',                  en: 'No',               pa: 'ਨਹੀਂ' },
  sankalp_yes:          { hi: 'हाँ',                   en: 'Yes',              pa: 'ਹਾਂ' },
  sankalp_reset_title:  { hi: 'संकल्प रीसेट करें',      en: 'Reset Sankalp',    pa: 'ਸੰਕਲਪ ਰੀਸੈੱਟ ਕਰੋ' },
  sankalp_reset_q:      { hi: 'क्या आप सुनिश्चित हैं?', en: 'Are you sure?',    pa: 'ਕੀ ਤੁਸੀਂ ਯਕੀਨੀ ਹੋ?' },
  sankalp_reset_btn:    { hi: 'रीसेट',                  en: 'Reset',            pa: 'ਰੀਸੈੱਟ' },

  // ── TemplesScreen ───────────────────────────────────────────────────────────
  temples_subtitle:  { hi: 'पूजा के पवित्र स्थान', en: 'Sacred places of worship', pa: 'ਪੂਜਾ ਦੇ ਪਵਿੱਤਰ ਸਥਾਨ' },
  temples_loading:   { hi: 'मंदिर लोड हो रहे हैं...', en: 'Loading Temples...', pa: 'ਮੰਦਰ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...' },
  temples_offline:   { hi: 'लोड नहीं हो सका',  en: 'Could not load',    pa: 'ਲੋਡ ਨਹੀਂ ਹੋ ਸਕਿਆ' },
  temples_net_err:   { hi: 'कृपया इंटरनेट कनेक्शन जाँचें।', en: 'Please check your internet connection and try again.', pa: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਇੰਟਰਨੈੱਟ ਕਨੈਕਸ਼ਨ ਜਾਂਚੋ।' },
  temples_retry:     { hi: 'फिर कोशिश करें',    en: 'Try Again',         pa: 'ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ' },

  // ── Stack headers ────────────────────────────────────────────────────────────
  header_settings:    { hi: 'सेटिंग',            en: 'App Settings',      pa: 'ਸੈਟਿੰਗ' },
  header_sankalp:     { hi: 'संकल्प',            en: 'Sankalp',           pa: 'ਸੰਕਲਪ' },
  header_wisdom:      { hi: 'आज का ज्ञान',        en: 'Daily Wisdom',      pa: 'ਰੋਜ਼ਾਨਾ ਗਿਆਨ' },
  header_prayer:      { hi: 'प्रार्थना मार्गदर्शन', en: 'Prayer Guide',     pa: 'ਪ੍ਰਾਰਥਨਾ ਗਾਈਡ' },
  header_library:     { hi: 'आध्यात्मिक पुस्तकालय', en: 'Spiritual Library', pa: 'ਅਧਿਆਤਮਿਕ ਪੁਸਤਕਾਲਯ' },
  header_chalisa:     { hi: 'चालीसा',            en: 'Chalisa',           pa: 'ਚਾਲੀਸਾ' },
  header_jaap:        { hi: 'जाप',               en: 'Jaap',              pa: 'ਜਾਪ' },
  header_stats:       { hi: 'आँकड़े',             en: 'Stats',             pa: 'ਅੰਕੜੇ' },
  header_temples:     { hi: 'मंदिर',             en: 'Temples',           pa: 'ਮੰਦਰ' },
  header_more:        { hi: 'और अधिक',           en: 'More',              pa: 'ਹੋਰ' },
} as const;

export type TranslationKey = keyof typeof translations;

/** Returns the UI string for the given key and language, falling back to English. */
export function t(key: TranslationKey, lang: Language, vars?: Record<string, string | number>): string {
  const entry = translations[key];
  let str: string = (entry[lang] ?? entry['en'] ?? key) as string;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(`{${k}}`, String(v));
    });
  }
  return str;
}
