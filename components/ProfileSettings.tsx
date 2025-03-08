import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme, Theme } from '@/hooks/useTheme';
import { useLanguage, Language } from '@/hooks/useLanguage';
import { ChevronRight } from 'lucide-react-native';

const LANGUAGES: { [key in Language]: string } = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
};

export function ProfileSettings() {
  const { theme, isDark, changeTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Appearance</Text>
        <View style={styles.setting}>
          <Text style={[styles.settingLabel, isDark && styles.textDark]}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={() => changeTheme(isDark ? 'light' : 'dark')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Language</Text>
        <TouchableOpacity
          style={styles.setting}
          onPress={() => {
            // Show language picker modal
          }}>
          <Text style={[styles.settingLabel, isDark && styles.textDark]}>{LANGUAGES[language]}</Text>
          <ChevronRight size={20} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Privacy</Text>
        <View style={styles.setting}>
          <Text style={[styles.settingLabel, isDark && styles.textDark]}>Private Profile</Text>
          <Switch value={false} onValueChange={() => {}} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Notifications</Text>
        <View style={styles.setting}>
          <Text style={[styles.settingLabel, isDark && styles.textDark]}>Push Notifications</Text>
          <Switch value={true} onValueChange={() => {}} />
        </View>
        <View style={styles.setting}>
          <Text style={[styles.settingLabel, isDark && styles.textDark]}>Email Notifications</Text>
          <Switch value={true} onValueChange={() => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  textDark: {
    color: '#fff',
  },
});