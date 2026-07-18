import { useLanguage } from '../context/LanguageContext';
import { t, TranslationKey } from '../constants/i18n';

/**
 * useT — returns a translation function bound to the current app language.
 *
 * Usage:
 *   const { T } = useT();
 *   <Text>{T('home_welcome')}</Text>
 *   <Text>{T('sankalp_pledge', { days: 11 })}</Text>
 */
export const useT = () => {
    const { language } = useLanguage();
    const T = (key: TranslationKey, vars?: Record<string, string | number>) =>
        t(key, language as any, vars);
    return { T, language };
};
