import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'StarterKit',
  description: 'Best StarterKit in the world',
  applicationName: 'StarterKit',
  viewport: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'StarterKit' },
  formatDetection: { telephone: false },
  themeColor: '#11112a',
  manifest: '/manifest.json',

  icons: {
    icon: 'favicon-32x32.png',
    shortcut: '/favicon.ico',
    apple: [
      '/images/touch-icon-iphone.png',
      '/images/touch-icon-ipad.png',
      '/images/touch-icon-iphone-retina.png',
      '/images/touch-icon-ipad-retina.png',
    ],
  },
};

export default metadata;
