import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no'></meta>
        <meta name='application-name' content='BuilderPlace' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
        <meta name='apple-mobile-web-app-title' content='BuilderPlace' />
        <meta name='description' content='Best BuilderPlace in the world' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/images/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#11112a' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#11112a' />

        <link rel='apple-touch-icon' href='/images/touch-icon-iphone.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/images/touch-icon-ipad.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/touch-icon-iphone-retina.png' />
        <link rel='apple-touch-icon' sizes='167x167' href='/images/touch-icon-ipad-retina.png' />

        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='mask-icon' href='/images/safari-pinned-tab.svg' color='#000000' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <body className='text-base-content bg-base-200'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
