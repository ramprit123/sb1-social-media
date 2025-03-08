import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useProfile } from './useProfile';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const systemTheme = useColorScheme();
  const { profile, updateProfile } = useProfile();
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    if (profile?.preferences) {
      const preferences = profile.preferences as { theme?: Theme };
      setTheme(preferences.theme || 'system');
    }
  }, [profile?.preferences]);

  const isDark = theme === 'system' ? systemTheme === 'dark' : theme === 'dark';

  const changeTheme = async (newTheme: Theme) => {
    try {
      await updateProfile({
        preferences: {
          ...(profile?.preferences as object || {}),
          theme: newTheme,
        },
      });
      setTheme(newTheme);
    } catch (error) {
      console.error('Failed to update theme:', error);
    }
  };

  return {
    theme,
    isDark,
    changeTheme,
  };
}