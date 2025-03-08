import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleResetPassword = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) throw error;
      
      setMessage({
        type: 'success',
        text: 'Check your email for password reset instructions',
      });
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'Failed to send reset instructions',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your email to receive reset instructions</Text>
      </View>

      <View style={styles.form}>
        {message && (
          <Text style={[
            styles.message,
            message.type === 'error' ? styles.error : styles.success
          ]}>
            {message.text}
          </Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Send Instructions</Text>
        </TouchableOpacity>

        <Link href="/login" style={styles.backLink}>
          <Text style={styles.backLinkText}>Back to Sign In</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 100 : 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter_400Regular',
  },
  form: {
    gap: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  button: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  message: {
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  error: {
    backgroundColor: '#FFE5E5',
    color: '#FF3B30',
  },
  success: {
    backgroundColor: '#E5FFE5',
    color: '#34C759',
  },
  backLink: {
    alignSelf: 'center',
    marginTop: 16,
  },
  backLinkText: {
    color: '#007AFF',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});