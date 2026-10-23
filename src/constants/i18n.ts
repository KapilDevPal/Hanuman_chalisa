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
  home_follow_instagram: { hi: 'इंस्टाग्राम पर फॉलो करें', en: 'Follow on Instagram', pa: 'ਇੰਸਟਾਗ੍ਰਾਮ ਤੇ ਫਾਲੋ ਕਰੋ' },
  home_share_whatsapp:   { hi: 'व्हाट्सएप पर शेयर करें', en: 'Share on WhatsApp', pa: 'ਵਟਸਐਪ ਤੇ ਸਾਂਝਾ ਕਰੋ' },
  way_to_pray_subtitle: { hi: 'श्रद्धा और विधि से पूजा करें', en: 'A simple, step-by-step path to worship', pa: 'ਸ਼ਰਧਾ ਅਤੇ ਵਿਧੀ ਨਾਲ ਪੂਜਾ ਕਰੋ' },
  home_read_chalisa:    { hi: 'हनुमान चालीसा पढ़ें',   en: 'Read Hanuman Chalisa',   pa: 'ਹਨੁਮਾਨ ਚਾਲੀਸਾ ਪੜ੍ਹੋ' },
  home_read_chalisa_sub: { hi: '{n} भाषाओं में उपलब्ध', en: 'Available in {n} languages', pa: '{n} ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਉਪਲਬਧ' },
  home_today:           { hi: 'आज',                  en: 'Today',                  pa: 'ਅੱਜ' },

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
  jaap_reset_q:        { hi: 'आज की गिनती 0 कर दें?', en: "Reset today's count to 0?", pa: 'ਅੱਜ ਦੀ ਗਿਣਤੀ 0 ਕਰ ਦਿਓ?' },

  // ── ChalisaScreen ───────────────────────────────────────────────────────────
  chalisa_ending:  { hi: '|| इति श्री हनुमान चालीसा समाप्त ||', en: '|| End of Hanuman Chalisa ||', pa: '|| ਹਨੁਮਾਨ ਚਾਲੀਸਾ ਸਮਾਪਤ ||' },
  chalisa_read_in: { hi: 'चालीसा की भाषा',  en: 'Read Chalisa in', pa: 'ਚਾਲੀਸਾ ਦੀ ਭਾਸ਼ਾ' },
  chalisa_lang_count: { hi: '{n} भाषाएँ',    en: '{n} languages',   pa: '{n} ਭਾਸ਼ਾਵਾਂ' },
  chalisa_language: { hi: 'भाषा',            en: 'Language',        pa: 'ਭਾਸ਼ਾ' },
  chalisa_search:  { hi: 'भाषा खोजें',        en: 'Search languages', pa: 'ਭਾਸ਼ਾ ਖੋਜੋ' },
  chalisa_no_match: { hi: 'कोई भाषा नहीं मिली', en: 'No matching language', pa: 'ਕੋਈ ਭਾਸ਼ਾ ਨਹੀਂ ਮਿਲੀ' },
  common_done:     { hi: 'हो गया',            en: 'Done',            pa: 'ਹੋ ਗਿਆ' },
  chalisa_doha:    { hi: 'दोहा',              en: 'Doha',            pa: 'ਦੋਹਾ' },
  chalisa_chaupai: { hi: 'चौपाई',             en: 'Chaupai',         pa: 'ਚੌਪਾਈ' },
  reader_not_found: { hi: 'पाठ नहीं मिला।',    en: 'Text not found.', pa: 'ਪਾਠ ਨਹੀਂ ਮਿਲਿਆ।' },
  wisdom_share:    { hi: 'शेयर करें',          en: 'Share',           pa: 'ਸਾਂਝਾ ਕਰੋ' },

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
  settings_appearance:      { hi: 'दिखावट',                  en: 'Appearance',                 pa: 'ਦਿੱਖ' },
  settings_dark_mode:       { hi: 'डार्क मोड',               en: 'Dark Mode',                  pa: 'ਡਾਰਕ ਮੋਡ' },
  settings_light_mode:      { hi: 'लाइट मोड',                en: 'Light Mode',                 pa: 'ਲਾਈਟ ਮੋਡ' },
  settings_appearance_hint: { hi: 'ऐप का रंग रूप बदलें',      en: 'Switch between light and dark theme', pa: 'ਲਾਈਟ ਅਤੇ ਡਾਰਕ ਥੀਮ ਵਿਚਕਾਰ ਬਦਲੋ' },
  settings_regional:      { hi: 'भाषा सेटिंग',            en: 'Regional Settings',          pa: 'ਭਾਸ਼ਾ ਸੈਟਿੰਗ' },
  settings_about:         { hi: 'ऐप के बारे में',          en: 'About App',                  pa: 'ਐਪ ਬਾਰੇ' },
  settings_version:       { hi: 'संस्करण',                en: 'Version',                    pa: 'ਸੰਸਕਰਣ' },
  settings_build:         { hi: 'बिल्ड',                 en: 'Build',                      pa: 'ਬਿਲਡ' },
  settings_bless:         { hi: 'जय बजरंग बली!',          en: 'Jai Bajrang Bali!',          pa: 'ਜੈ ਬਜਰੰਗ ਬਲੀ!' },
  settings_devotion:      { hi: 'भक्ति भाव से बनाया गया',  en: 'Made with devotion',         pa: 'ਭਗਤੀ ਨਾਲ ਬਣਾਇਆ' },
  settings_language:      { hi: 'ऐप की भाषा',            en: 'App Language',               pa: 'ਐਪ ਦੀ ਭਾਸ਼ਾ' },
  settings_language_hint: { hi: 'मेनू और लेबल की भाषा',   en: 'Used for menus and labels',  pa: 'ਮੀਨੂ ਅਤੇ ਲੇਬਲ ਦੀ ਭਾਸ਼ਾ' },

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

  // ── TemplesScreen / WebViewScreen ───────────────────────────────────────────
  temples_subtitle:  { hi: 'पूजा के पवित्र स्थान', en: 'Sacred places of worship', pa: 'ਪੂਜਾ ਦੇ ਪਵਿੱਤਰ ਸਥਾਨ' },
  temples_loading:   { hi: 'मंदिर लोड हो रहे हैं...', en: 'Loading Temples...', pa: 'ਮੰਦਰ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...' },
  temples_offline:   { hi: 'लोड नहीं हो सका',  en: 'Could not load',    pa: 'ਲੋਡ ਨਹੀਂ ਹੋ ਸਕਿਆ' },
  temples_net_err:   { hi: 'कृपया इंटरनेट कनेक्शन जाँचें।', en: 'Please check your internet connection and try again.', pa: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਇੰਟਰਨੈੱਟ ਕਨੈਕਸ਼ਨ ਜਾਂਚੋ।' },
  temples_retry:     { hi: 'फिर कोशिश करें',    en: 'Try Again',         pa: 'ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ' },

  // ── MoreScreen ──────────────────────────────────────────────────────────────
  more_title:              { hi: 'और अधिक',              en: 'More',                        pa: 'ਹੋਰ' },
  more_subtitle:           { hi: 'लिंक, संसाधन और आपकी निजी जगह', en: 'Links, resources, and your personal space', pa: 'ਲਿੰਕ, ਸਰੋਤ ਅਤੇ ਤੁਹਾਡੀ ਨਿੱਜੀ ਜਗ੍ਹਾ' },
  more_explore_section:    { hi: 'खोजें',                 en: 'Explore',                     pa: 'ਖੋਜੋ' },
  more_mandirpedia:        { hi: 'मंदिरपीडिया',            en: 'Mandirpedia',                 pa: 'ਮੰਦਿਰਪੀਡੀਆ' },
  more_mandirpedia_sub:    { hi: 'मंदिरों की पूरी सूची देखें', en: 'Browse the full temple directory', pa: 'ਮੰਦਰਾਂ ਦੀ ਪੂਰੀ ਸੂਚੀ ਵੇਖੋ' },
  more_rashifal:           { hi: 'राशिफल',                en: 'Rashifal',                    pa: 'ਰਾਸ਼ੀਫਲ' },
  more_rashifal_sub:       { hi: 'आज का राशिफल और पंचांग',  en: "Today's horoscope & panchang", pa: 'ਅੱਜ ਦਾ ਰਾਸ਼ੀਫਲ ਅਤੇ ਪੰਚਾਂਗ' },
  more_personal_section:   { hi: 'व्यक्तिगत',              en: 'Personal',                    pa: 'ਨਿੱਜੀ' },
  more_notes:              { hi: 'मेरे नोट्स',             en: 'My Notes',                    pa: 'ਮੇਰੇ ਨੋਟਸ' },
  more_notes_sub:          { hi: 'अपने विचार और तस्वीरें सहेजें', en: 'Save your own text and photos', pa: 'ਆਪਣੇ ਵਿਚਾਰ ਅਤੇ ਤਸਵੀਰਾਂ ਸੰਭਾਲੋ' },

  // ── NotesScreen / NoteEditorScreen ──────────────────────────────────────────
  notes_title:          { hi: 'मेरे नोट्स',          en: 'My Notes',                pa: 'ਮੇਰੇ ਨੋਟਸ' },
  notes_subtitle:       { hi: 'आपकी निजी डायरी',     en: 'Your personal, on-device diary', pa: 'ਤੁਹਾਡੀ ਨਿੱਜੀ ਡਾਇਰੀ' },
  notes_info_title:     { hi: 'केवल आपके डिवाइस पर सहेजा गया', en: 'Saved only on your device', pa: 'ਸਿਰਫ਼ ਤੁਹਾਡੇ ਡਿਵਾਈਸ ਤੇ ਸੰਭਾਲਿਆ ਗਿਆ' },
  notes_info_desc:      { hi: 'यहाँ आप अपने विचार लिख सकते हैं और तस्वीरें जोड़ सकते हैं। सब कुछ स्थानीय रूप से सहेजा जाता है, कहीं भी अपलोड नहीं होता, और केवल आप ही इसे देख सकते हैं।', en: 'Write your own text and attach photos here. Everything is stored locally on this phone, never uploaded anywhere, and only you can see it.', pa: 'ਇੱਥੇ ਤੁਸੀਂ ਆਪਣੇ ਵਿਚਾਰ ਲਿਖ ਸਕਦੇ ਹੋ ਅਤੇ ਤਸਵੀਰਾਂ ਜੋੜ ਸਕਦੇ ਹੋ। ਸਭ ਕੁਝ ਸਥਾਨਕ ਤੌਰ ਤੇ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ।' },
  notes_empty:          { hi: 'अभी तक कोई नोट नहीं। + बटन दबाकर पहला नोट बनाएं।', en: 'No notes yet. Tap + to create your first one.', pa: 'ਹਾਲੇ ਕੋਈ ਨੋਟ ਨਹੀਂ। + ਦਬਾ ਕੇ ਪਹਿਲਾ ਨੋਟ ਬਣਾਓ।' },
  notes_untitled:       { hi: 'बिना शीर्षक',          en: 'Untitled',                pa: 'ਬਿਨਾਂ ਸਿਰਲੇਖ' },
  notes_new_title:      { hi: 'नया नोट',              en: 'New Note',                pa: 'ਨਵਾਂ ਨੋਟ' },
  notes_edit_title:     { hi: 'नोट संपादित करें',      en: 'Edit Note',               pa: 'ਨੋਟ ਸੰਪਾਦਿਤ ਕਰੋ' },
  notes_title_ph:       { hi: 'शीर्षक',               en: 'Title',                   pa: 'ਸਿਰਲੇਖ' },
  notes_text_ph:        { hi: 'यहाँ अपने विचार लिखें...', en: 'Write your thoughts here...', pa: 'ਇੱਥੇ ਆਪਣੇ ਵਿਚਾਰ ਲਿਖੋ...' },
  notes_photos:         { hi: 'तस्वीरें',              en: 'Photos',                  pa: 'ਤਸਵੀਰਾਂ' },
  notes_photo_count:    { hi: '{n} तस्वीरें',          en: '{n} photos',              pa: '{n} ਤਸਵੀਰਾਂ' },
  notes_photos_hint:    { hi: 'फुल स्क्रीन में देखने के लिए तस्वीर पर टैप करें', en: 'Tap a photo to view it full screen', pa: 'ਪੂਰੀ ਸਕ੍ਰੀਨ ਵਿੱਚ ਵੇਖਣ ਲਈ ਤਸਵੀਰ ਤੇ ਟੈਪ ਕਰੋ' },
  notes_add_image:      { hi: 'फोटो जोड़ें',           en: 'Add Photo',               pa: 'ਫੋਟੋ ਜੋੜੋ' },
  notes_save:           { hi: 'सहेजें',               en: 'Save',                    pa: 'ਸੰਭਾਲੋ' },
  notes_saving:         { hi: 'सहेजा जा रहा है...',    en: 'Saving...',               pa: 'ਸੰਭਾਲਿਆ ਜਾ ਰਿਹਾ ਹੈ...' },
  notes_save_error:     { hi: 'नोट सहेजने में विफल',   en: 'Failed to save note',     pa: 'ਨੋਟ ਸੰਭਾਲਣ ਵਿੱਚ ਅਸਫਲ' },
  notes_delete_title:   { hi: 'नोट हटाएं',            en: 'Delete Note',             pa: 'ਨੋਟ ਹਟਾਓ' },
  notes_delete_q:       { hi: 'क्या आप सुनिश्चित हैं? यह क्रिया पूर्ववत नहीं की जा सकती।', en: 'Are you sure? This cannot be undone.', pa: 'ਕੀ ਤੁਸੀਂ ਯਕੀਨੀ ਹੋ? ਇਹ ਵਾਪਸ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ।' },
  notes_permission_title: { hi: 'अनुमति आवश्यक',       en: 'Permission Needed',       pa: 'ਇਜਾਜ਼ਤ ਲੋੜੀਂਦੀ ਹੈ' },
  notes_permission_desc:  { hi: 'फोटो जोड़ने के लिए गैलरी एक्सेस की अनुमति दें।', en: 'Please allow access to your photo gallery to add an image.', pa: 'ਫੋਟੋ ਜੋੜਨ ਲਈ ਗੈਲਰੀ ਐਕਸੈਸ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ।' },

  notes_tab_notes:      { hi: 'नोट्स',                en: 'Notes',                   pa: 'ਨੋਟਸ' },
  notes_tab_gallery:    { hi: 'गैलरी',                en: 'Gallery',                 pa: 'ਗੈਲਰੀ' },
  notes_gallery_empty:  { hi: 'अभी कोई तस्वीर नहीं। किसी नोट में मंत्र की फोटो जोड़ें।', en: 'No photos yet. Add a photo of a mantra to any note.', pa: 'ਹਾਲੇ ਕੋਈ ਤਸਵੀਰ ਨਹੀਂ। ਕਿਸੇ ਨੋਟ ਵਿੱਚ ਮੰਤਰ ਦੀ ਫੋਟੋ ਜੋੜੋ।' },
  notes_edit:           { hi: 'बदलें',                en: 'Edit',                    pa: 'ਬਦਲੋ' },

  // ── HelpScreen ──────────────────────────────────────────────────────────────
  more_help:            { hi: 'सहायता और गाइड',        en: 'Help & Guide',            pa: 'ਮਦਦ ਅਤੇ ਗਾਈਡ' },
  more_help_sub:        { hi: 'ऐप का उपयोग कैसे करें',   en: 'Why and how to use the app', pa: 'ਐਪ ਦੀ ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ' },
  help_why:             { hi: 'क्यों',                 en: 'Why',                     pa: 'ਕਿਉਂ' },
  help_how:             { hi: 'कैसे',                  en: 'How',                     pa: 'ਕਿਵੇਂ' },
  help_open:            { hi: 'खोलें',                 en: 'Open',                    pa: 'ਖੋਲ੍ਹੋ' },

  // ── In-app review ───────────────────────────────────────────────────────────
  review_title:         { hi: 'क्या आपको ऐप पसंद आ रहा है?', en: 'Enjoying Hanuman Chalisa?', pa: 'ਕੀ ਤੁਹਾਨੂੰ ਐਪ ਪਸੰਦ ਆ ਰਿਹਾ ਹੈ?' },
  review_message:       { hi: 'आपकी रेटिंग से और भक्तों को यह ऐप मिलने में मदद मिलती है। जय श्री राम!', en: 'A quick rating helps other devotees find the app. Jai Shri Ram!', pa: 'ਤੁਹਾਡੀ ਰੇਟਿੰਗ ਨਾਲ ਹੋਰ ਭਗਤਾਂ ਨੂੰ ਇਹ ਐਪ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਮਿਲਦੀ ਹੈ। ਜੈ ਸ਼੍ਰੀ ਰਾਮ!' },
  review_rate:          { hi: 'रेटिंग दें',             en: 'Rate now',                pa: 'ਰੇਟਿੰਗ ਦਿਓ' },
  review_later:         { hi: 'अभी नहीं',              en: 'Not now',                 pa: 'ਹੁਣੇ ਨਹੀਂ' },
  settings_rate:        { hi: 'ऐप को रेटिंग दें',        en: 'Rate this app',           pa: 'ਐਪ ਨੂੰ ਰੇਟਿੰਗ ਦਿਓ' },
  settings_rate_sub:    { hi: 'प्ले स्टोर पर अपनी राय लिखें', en: 'Share your feedback on the store', pa: 'ਸਟੋਰ ਤੇ ਆਪਣੀ ਰਾਇ ਲਿਖੋ' },

  // ── In-app updates ──────────────────────────────────────────────────────────
  update_title:         { hi: 'नया अपडेट उपलब्ध',       en: 'Update available',        pa: 'ਨਵਾਂ ਅੱਪਡੇਟ ਉਪਲਬਧ' },
  update_message:       { hi: 'हनुमान चालीसा का नया संस्करण उपलब्ध है। डाउनलोड होते समय आप ऐप का उपयोग जारी रख सकते हैं।', en: 'A new version of Hanuman Chalisa is available. It downloads in the background while you keep using the app.', pa: 'ਹਨੁਮਾਨ ਚਾਲੀਸਾ ਦਾ ਨਵਾਂ ਸੰਸਕਰਣ ਉਪਲਬਧ ਹੈ। ਡਾਊਨਲੋਡ ਦੌਰਾਨ ਤੁਸੀਂ ਐਪ ਵਰਤਦੇ ਰਹਿ ਸਕਦੇ ਹੋ।' },
  update_now:           { hi: 'अभी अपडेट करें',        en: 'Update Now',              pa: 'ਹੁਣੇ ਅੱਪਡੇਟ ਕਰੋ' },
  update_later:         { hi: 'बाद में',               en: 'Later',                   pa: 'ਬਾਅਦ ਵਿੱਚ' },
  update_ready_title:   { hi: 'अपडेट तैयार है',        en: 'Update ready',            pa: 'ਅੱਪਡੇਟ ਤਿਆਰ ਹੈ' },
  update_ready_message: { hi: 'अपडेट डाउनलोड हो गया है। इंस्टॉल करने के लिए ऐप को रीस्टार्ट करें।', en: 'The update has been downloaded. Restart the app to install it.', pa: 'ਅੱਪਡੇਟ ਡਾਊਨਲੋਡ ਹੋ ਗਿਆ ਹੈ। ਇੰਸਟਾਲ ਕਰਨ ਲਈ ਐਪ ਰੀਸਟਾਰਟ ਕਰੋ।' },
  update_restart:       { hi: 'अभी रीस्टार्ट करें',      en: 'Restart Now',             pa: 'ਹੁਣੇ ਰੀਸਟਾਰਟ ਕਰੋ' },
  update_check:         { hi: 'अपडेट जाँचें',          en: 'Check for updates',       pa: 'ਅੱਪਡੇਟ ਜਾਂਚੋ' },
  update_check_sub:     { hi: 'गूगल प्ले से नया संस्करण पाएँ', en: 'Get the latest version from Google Play', pa: 'ਗੂਗਲ ਪਲੇ ਤੋਂ ਨਵਾਂ ਸੰਸਕਰਣ ਲਓ' },
  update_none:          { hi: 'आपके पास नवीनतम संस्करण है।', en: "You're on the latest version.", pa: 'ਤੁਹਾਡੇ ਕੋਲ ਨਵੀਨਤਮ ਸੰਸਕਰਣ ਹੈ।' },
  update_failed:        { hi: 'अपडेट डाउनलोड नहीं हो सका। कृपया बाद में फिर कोशिश करें।', en: "The update couldn't be downloaded. Please try again later.", pa: 'ਅੱਪਡੇਟ ਡਾਊਨਲੋਡ ਨਹੀਂ ਹੋ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਕੋਸ਼ਿਸ਼ ਕਰੋ।' },

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
