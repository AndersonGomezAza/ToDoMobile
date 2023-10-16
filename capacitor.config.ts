import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Mi ToDo',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
