import React from 'react';
import Head from 'next/head';

export default function HtmlHead() {
  return (
    <Head>
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
      <link rel='manifest' href='/manifest.json' />
      <link rel='mask-icon' href='/images/safari-pinned-tab.svg' color='#000000' />
      <link rel='shortcut icon' href='/favicon.ico' />
    </Head>
  );
}
