import { useState, useEffect } from 'react';
import { useProfile } from './useProfile';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko';

export function useLanguage() {
  const { profile, updateProfile } = useProfile();
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    if (profile?.preferences) {
      const preferences = profile.preferences as { language?: Language };
      setLanguage(preferences.language || 'en');
    }
  }, [profile?.preferences]);

  const changeLanguage = async (newLanguage: Language) => {
    try {
      await updateProfile({
        preferences: {
          ...(profile?.preferences as object || {}),
          language: newLanguage,
        },
      });
      setLanguage(newLanguage);
    } catch (error) {
      console.error('Failed to update language:', error);
    }
  };

  return {
    language,
    changeLanguage,
  };
}