import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Auth from '../components/auth';

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <Auth/>
    </SafeAreaView>
  )
}