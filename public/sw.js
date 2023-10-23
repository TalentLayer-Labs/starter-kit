if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise(s => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const n = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[n]) return;
    let r = {};
    const d = e => a(e, n),
      o = { module: { uri: n }, exports: r, require: d };
    s[n] = Promise.all(i.map(e => o[e] || d(e))).then(e => (c(...e), r));
  };
}
define(['./workbox-588899ac'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/6qOD3EvpHXZoF8T3Zcxa-/_buildManifest.js',
          revision: 'f1aebd84c1d21eb16feb005b310136e9',
        },
        {
          url: '/_next/static/6qOD3EvpHXZoF8T3Zcxa-/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/1487-bd5027b1da34cce0.js', revision: 'bd5027b1da34cce0' },
        { url: '/_next/static/chunks/16829283-44ee8114e798d7d9.js', revision: '44ee8114e798d7d9' },
        { url: '/_next/static/chunks/1794-feff2fea8bf918f4.js', revision: 'feff2fea8bf918f4' },
        { url: '/_next/static/chunks/1990-3598cb6264590514.js', revision: '3598cb6264590514' },
        { url: '/_next/static/chunks/2613-5abe55269ccdadfa.js', revision: '5abe55269ccdadfa' },
        { url: '/_next/static/chunks/2894.e29c5eae2ff6f9e6.js', revision: 'e29c5eae2ff6f9e6' },
        { url: '/_next/static/chunks/29107295-54c46f60208f68c8.js', revision: '54c46f60208f68c8' },
        { url: '/_next/static/chunks/3764-f554c500ac7d77bb.js', revision: 'f554c500ac7d77bb' },
        { url: '/_next/static/chunks/422.4e623e3964eba4d5.js', revision: '4e623e3964eba4d5' },
        { url: '/_next/static/chunks/5641-4bd4ab4953964fe9.js', revision: '4bd4ab4953964fe9' },
        { url: '/_next/static/chunks/5739-af747fff81661009.js', revision: 'af747fff81661009' },
        { url: '/_next/static/chunks/5926-69122fef17f30fe3.js', revision: '69122fef17f30fe3' },
        { url: '/_next/static/chunks/6765.efec6e8b3424c8dc.js', revision: 'efec6e8b3424c8dc' },
        { url: '/_next/static/chunks/7206.aec0b33c0337887f.js', revision: 'aec0b33c0337887f' },
        { url: '/_next/static/chunks/8066.fedf142be67329a0.js', revision: 'fedf142be67329a0' },
        { url: '/_next/static/chunks/8358-073f1b3bafd74d10.js', revision: '073f1b3bafd74d10' },
        { url: '/_next/static/chunks/9343.268bece2de377a2e.js', revision: '268bece2de377a2e' },
        { url: '/_next/static/chunks/9444-3e249bb1104906e2.js', revision: '3e249bb1104906e2' },
        { url: '/_next/static/chunks/9827.d875cebb3cf64513.js', revision: 'd875cebb3cf64513' },
        { url: '/_next/static/chunks/framework-ce84985cd166733a.js', revision: 'ce84985cd166733a' },
        { url: '/_next/static/chunks/main-19ade2b3c050a33e.js', revision: '19ade2b3c050a33e' },
        {
          url: '/_next/static/chunks/pages/%5Bdomain%5D-186baac092a57f6a.js',
          revision: '186baac092a57f6a',
        },
        {
          url: '/_next/static/chunks/pages/%5Bdomain%5D/Layout-307512fe1ea3e6c1.js',
          revision: '307512fe1ea3e6c1',
        },
        {
          url: '/_next/static/chunks/pages/%5Bdomain%5D/admin-8846a5e4dfc39cbe.js',
          revision: '8846a5e4dfc39cbe',
        },
        {
          url: '/_next/static/chunks/pages/%5Bdomain%5D/admin/custom-domain-a0c7dec1af20d6e5.js',
          revision: 'a0c7dec1af20d6e5',
        },
        {
          url: '/_next/static/chunks/pages/%5Bdomain%5D/chat-88442d50786e043f.js',
          revision: '88442d50786e043f',
        },
        {
          url: '/_next/static/chunks/pages/%5Bdomain%5D/connect-fa549b20ba2ebaa6.js',
          revision: 'fa549b20ba2ebaa6',
        },
        {
          url: '/_next/static/chunks/pages/%5Bdomain%5D/dashboard-9a25c399977c8a21.js',
          revision: '9a25c399977c8a21',
        },
        {
          url: '/_next/static/chunks/pages/%5Bdomain%5D/profile-f0d5770efd9edccc.js',
          revision: 'f0d5770efd9edccc',
        },
        {
          url: '/_next/static/chunks/pages/%5Bdomain%5D/work/%5BworkId%5D-7300b8efb3631ab6.js',
          revision: '7300b8efb3631ab6',
        },
        {
          url: '/_next/static/chunks/pages/Layout-17e08edf8c75531d.js',
          revision: '17e08edf8c75531d',
        },
        {
          url: '/_next/static/chunks/pages/_error-82b79221b9ed784b.js',
          revision: '82b79221b9ed784b',
        },
        {
          url: '/_next/static/chunks/pages/admin/dispute-336e255f18b84b87.js',
          revision: '336e255f18b84b87',
        },
        {
          url: '/_next/static/chunks/pages/admin/fees-22dff8a752e56420.js',
          revision: '22dff8a752e56420',
        },
        {
          url: '/_next/static/chunks/pages/admin/presentation-0067e502787e4e50.js',
          revision: '0067e502787e4e50',
        },
        {
          url: '/_next/static/chunks/pages/dashboard-db850f148cfc7f95.js',
          revision: 'db850f148cfc7f95',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/messaging-beb06bb59140a7ef.js',
          revision: 'beb06bb59140a7ef',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/messaging/%5Baddress%5D-6e25795dc13940b2.js',
          revision: '6e25795dc13940b2',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/messaging/ai-c1a8c56d98b00fff.js',
          revision: 'c1a8c56d98b00fff',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/profile/%5Bid%5D-ddba6a17ad4439f1.js',
          revision: 'ddba6a17ad4439f1',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/profile/edit-a2d9b725f79ed66e.js',
          revision: 'a2d9b725f79ed66e',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/profile/edit/privacy-0b753e3137c51adb.js',
          revision: '0b753e3137c51adb',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/profile/edit/settings-e091a472e1fbc9bd.js',
          revision: 'e091a472e1fbc9bd',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/profile/edit/trust-score-3e53c422c9177fcc.js',
          revision: '3e53c422c9177fcc',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/profile/incomes-43d65c82b7cb6127.js',
          revision: '43d65c82b7cb6127',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/services-181f72be37783689.js',
          revision: '181f72be37783689',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/services/%5Bid%5D-1ec4c3c13383815a.js',
          revision: '1ec4c3c13383815a',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/services/%5Bid%5D/proposal-3ee261ea769a4cd1.js',
          revision: '3ee261ea769a4cd1',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/services/create-c7fa0ca6db97e965.js',
          revision: 'c7fa0ca6db97e965',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/talents-182c84fd79ffa61f.js',
          revision: '182c84fd79ffa61f',
        },
        {
          url: '/_next/static/chunks/pages/index-6b2130f9f3cd5815.js',
          revision: '6b2130f9f3cd5815',
        },
        {
          url: '/_next/static/chunks/pages/landing-eed01f196c35138d.js',
          revision: 'eed01f196c35138d',
        },
        {
          url: '/_next/static/chunks/pages/landing/connect-6b4ec8adb57c1dab.js',
          revision: '6b4ec8adb57c1dab',
        },
        {
          url: '/_next/static/chunks/pages/landing/contact-2e6756f2698255eb.js',
          revision: '2e6756f2698255eb',
        },
        {
          url: '/_next/static/chunks/pages/landing/onboarding-1f26b705cceb1855.js',
          revision: '1f26b705cceb1855',
        },
        {
          url: '/_next/static/chunks/pages/landing/worklist-aad6097e4ea869b5.js',
          revision: 'aad6097e4ea869b5',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        { url: '/_next/static/chunks/webpack-0f036e689d9221c2.js', revision: '0f036e689d9221c2' },
        { url: '/_next/static/css/10469381bbda55f7.css', revision: '10469381bbda55f7' },
        { url: '/browserconfig.xml', revision: 'c22c8bde647ceabec6cd286966715ee6' },
        { url: '/favicon-16x16.png', revision: 'b87c9e69f006de4b3b647dd52b457dce' },
        { url: '/favicon-32x32.png', revision: '2b044e9a4674db5c387604fad2a36b99' },
        { url: '/favicon.ico', revision: '2b044e9a4674db5c387604fad2a36b99' },
        { url: '/fonts/Inter-Black.woff', revision: '1ede379289f9fdbf1611dfc4912f2fe0' },
        { url: '/fonts/Inter-Black.woff2', revision: 'edf1baa02cd941c61d54610f955f49c6' },
        { url: '/fonts/Inter-Bold.woff', revision: 'a0e8358d58e034584e0df3a2e85df70d' },
        { url: '/fonts/Inter-Bold.woff2', revision: '231f444dc08212ed0133d8ea5c95c670' },
        { url: '/fonts/Inter-ExtraBold.woff', revision: '5bcb79898181c4bb98fcfb51396ae5bc' },
        { url: '/fonts/Inter-ExtraBold.woff2', revision: '27153fbca673d878c6c2d5f66d1c79e3' },
        { url: '/fonts/Inter-ExtraLight.woff', revision: '89a33fa26bd5081092b3242a139a82c6' },
        { url: '/fonts/Inter-ExtraLight.woff2', revision: '096d2525ccd66102732d46ea8ace2a03' },
        { url: '/fonts/Inter-Light.woff', revision: '4217570ca501e21a22fa7626e894f0c4' },
        { url: '/fonts/Inter-Light.woff2', revision: '46884d02ecfedca5fc5787381e9d1963' },
        { url: '/fonts/Inter-Medium.woff', revision: '6b5a42f0603ea013e7099c2160e007e7' },
        { url: '/fonts/Inter-Medium.woff2', revision: '943a67750859470af9d9989ae91aef35' },
        { url: '/fonts/Inter-Regular.woff', revision: 'ea2c76b525641c2051cdf7d930e465ba' },
        { url: '/fonts/Inter-Regular.woff2', revision: 'a90c493e75dbd61aec1195dbb9bb6b06' },
        { url: '/fonts/Inter-SemiBold.woff', revision: '0b0032825214b711197bfcd54966edbb' },
        { url: '/fonts/Inter-SemiBold.woff2', revision: '920533ddd1d6ea543f7fc3e89b4556bb' },
        { url: '/fonts/Inter-Thin.woff', revision: 'b9326ea96d9a02d16a42ef63432dc0a5' },
        { url: '/fonts/Inter-Thin.woff2', revision: '273c722a93e65e139f45f82635196f68' },
        { url: '/fonts/stylesheet.css', revision: 'b6035a16df2d89f674555c3560fd72b8' },
        { url: '/images/android-chrome-192x192.png', revision: '6ffceedb1544001d998ef209c14af73d' },
        { url: '/images/android-chrome-512x512.png', revision: 'de3ca3888ae02f042f1b57acad6da697' },
        { url: '/images/apple-touch-icon.png', revision: 'bc0477e5ca2c50322467ab2fd03fcb02' },
        { url: '/images/blockchain/134.png', revision: '8c80c89d60da0bbb16e0f7e2f479a7c4' },
        { url: '/images/blockchain/80001.png', revision: '17c35f38d7fbe13881e55a236690dfad' },
        { url: '/images/browserconfig.xml', revision: 'c22c8bde647ceabec6cd286966715ee6' },
        { url: '/images/check_green_circle.svg', revision: '46570f0809131134c01dc096e50739fc' },
        { url: '/images/default-avatar-0.jpeg', revision: '042235ac5d2a7184a8fdd623878962ae' },
        { url: '/images/default-avatar-1.jpeg', revision: '0eaafef2f42b9f680dad75bffdb2f7e5' },
        { url: '/images/default-avatar-10.jpeg', revision: '0110da3e24fb6492681985e53eb3da25' },
        { url: '/images/default-avatar-11.jpeg', revision: 'af89d9900be44fa4e2cd1dd8e632fca1' },
        { url: '/images/default-avatar-2.jpeg', revision: 'bdf82c2f057689f84e5cbf78f59eb0ff' },
        { url: '/images/default-avatar-3.jpeg', revision: '042235ac5d2a7184a8fdd623878962ae' },
        { url: '/images/default-avatar-4.jpeg', revision: '72d0368559a01c877acc44802be1b335' },
        { url: '/images/default-avatar-5.jpeg', revision: 'c423dd3135d226ae8f738beba8b21780' },
        { url: '/images/default-avatar-6.jpeg', revision: '0eda28e66fa8473e454c2af80252142c' },
        { url: '/images/default-avatar-7.jpeg', revision: '7e3a9183e6396b4c413a97a06bf4270b' },
        { url: '/images/default-avatar-8.jpeg', revision: '26b6d37ee78de72e64777c1684c21c29' },
        { url: '/images/default-avatar-9.jpeg', revision: '306c085fbc1fa100d9a6e4349ad38562' },
        { url: '/images/favicon-16x16.png', revision: 'b87c9e69f006de4b3b647dd52b457dce' },
        { url: '/images/favicon-32x32.png', revision: '2b044e9a4674db5c387604fad2a36b99' },
        { url: '/images/favicon.ico', revision: 'fbb656c7d61a07fa75d8efee32e550cb' },
        { url: '/images/favicon.svg', revision: '1b9e36d4008f41654fdfc873766417b2' },
        {
          url: '/images/home/about/about-1-light.png',
          revision: 'e94dd2d3e7c1f0ab2fb557c83e6f0cc9',
        },
        { url: '/images/home/graphics/texture.svg', revision: 'e971f922440126082abc41a68456ce46' },
        { url: '/images/home/hero/hero-light.png', revision: '0ba048f1305817157a7bcae29c7d15a8' },
        {
          url: '/images/home/screens/mobile-frame.png',
          revision: 'eefb795b8e1e465eeb286dca65b50da3',
        },
        {
          url: '/images/home/testimonials/author-04.png',
          revision: '02f76c6cbbeac8ac6e46e412b8556de6',
        },
        {
          url: '/images/home/testimonials/author-1.png',
          revision: 'b5db43b921cad8cb5fae33b35f8f52b1',
        },
        {
          url: '/images/home/testimonials/author-2.png',
          revision: '12117d16b2ccf5edfce111761aa34cda',
        },
        {
          url: '/images/home/testimonials/author-3.png',
          revision: 'cc2a72b5f5aa842812766600104af9f6',
        },
        { url: '/images/matic.png', revision: '17c35f38d7fbe13881e55a236690dfad' },
        { url: '/images/mstile-150x150.png', revision: '01259b75b321d01e87b21fcfa139abfe' },
        { url: '/images/purple_checkmark.svg', revision: '05f847858a79095e73d59daf212fbf53' },
        { url: '/images/safari-pinned-tab.svg', revision: '5f56489f72cf0b08bf16217a54b64008' },
        {
          url: '/images/sismo-badges/sismo_10jobs.svg',
          revision: 'f7fe732c8767bc3da1ab6defd75dc94a',
        },
        {
          url: '/images/sismo-badges/sismo_10jobs4stars.svg',
          revision: 'b099994c38d7f51db24b2e8dc07d3ced',
        },
        {
          url: '/images/sismo-badges/sismo_10jobs5stars.svg',
          revision: 'e160198b6ded024e62360bf13e8f8829',
        },
        {
          url: '/images/sismo-badges/sismo_10jobs_graphic.svg',
          revision: 'f24cdae48a46401521cc9322222afcf1',
        },
        {
          url: '/images/sismo-badges/sismo_10jobs_php.svg',
          revision: '8684ed141cd1f3d992b6ecc6f5811c58',
        },
        {
          url: '/images/sismo-badges/sismo_10jobs_sol.svg',
          revision: '0b335767d5e30f876790f6ddde886f95',
        },
        {
          url: '/images/sismo-badges/sismo_1earned.svg',
          revision: 'e1a80c02718506b081d9e41e4e9b771d',
        },
        {
          url: '/images/sismo-badges/sismo_1jobs.svg',
          revision: 'b1b9c42b7b7e088c8212070cd0f29309',
        },
        {
          url: '/images/sismo-badges/sismo_1jobs_graphic.svg',
          revision: '36db9eb5df7afeee36ade205c6c15d11',
        },
        {
          url: '/images/sismo-badges/sismo_1jobs_php.svg',
          revision: 'dbed272027a84f18305b18d106b6e091',
        },
        {
          url: '/images/sismo-badges/sismo_1jobs_sol.svg',
          revision: 'afbbcdfd5432f27eaf16ac1b6aaeb7d9',
        },
        {
          url: '/images/sismo-badges/sismo_200earned.svg',
          revision: 'e814f64d2b3e6a4db9f40d88a9966dee',
        },
        {
          url: '/images/sismo-badges/sismo_20jobs.svg',
          revision: 'ca3bcf8c1b1434ac391bff9aa77179b3',
        },
        {
          url: '/images/sismo-badges/sismo_20jobs4stars.svg',
          revision: '633a7feaffc11f921727a9cbdde9102b',
        },
        {
          url: '/images/sismo-badges/sismo_20jobs5stars.svg',
          revision: 'd9b7f4e1aa77822d673d72045d0d0a2f',
        },
        {
          url: '/images/sismo-badges/sismo_20jobs_graphic.svg',
          revision: '967ed14c709f35d86f7afb3a07365175',
        },
        {
          url: '/images/sismo-badges/sismo_20jobs_php.svg',
          revision: '1a81d7a646ae2b905438d1f30d994db8',
        },
        {
          url: '/images/sismo-badges/sismo_20jobs_sol.svg',
          revision: '01d1b98a06f538edb49bc5f59c272749',
        },
        {
          url: '/images/sismo-badges/sismo_500earned.svg',
          revision: '15ad23686c1f3360ac708217e3fd62d3',
        },
        {
          url: '/images/sismo-badges/sismo_5jobs4stars.svg',
          revision: 'c855f5b52c70972677ba5ad4113ec212',
        },
        {
          url: '/images/sismo-badges/sismo_5jobs5stars.svg',
          revision: 'd25080b18e0528eefded546c6773e1b2',
        },
        {
          url: '/images/sismo-badges/sismo_talentofmonth_graphic.svg',
          revision: '524ec5732c59f3e11f6f10e5670c1fcb',
        },
        {
          url: '/images/sismo-badges/sismo_talentofmonth_php.svg',
          revision: 'e0a1a78185062f550bd16fb105389b7e',
        },
        {
          url: '/images/sismo-badges/sismo_talentofmonth_sol.svg',
          revision: 'ed8e24cc4474bd29bc09e77edb8fa395',
        },
        {
          url: '/images/sismo-badges/sismo_workedforaave.svg',
          revision: '38c71064b7113314dd9707eab4b6e08c',
        },
        {
          url: '/images/sismo-badges/sismo_workedfordoge.svg',
          revision: '836b6aadf4514fe747e5a6b94b2f0dac',
        },
        {
          url: '/images/sismo-badges/sismo_workedforgitcoin.svg',
          revision: 'c2c0182599a3e8e86f3eab22878eb266',
        },
        { url: '/images/site.webmanifest', revision: '16ce9348ed8042c80163269502e90f4f' },
        { url: '/logo-text-dark.png', revision: '1683e6ca2ca28afdb05517f6be37e57b' },
        { url: '/logo-text-stone-800.png', revision: '6d39b56952e68151fdfde903b8da52ae' },
        { url: '/logo.png', revision: '6ffceedb1544001d998ef209c14af73d' },
        { url: '/logo192.png', revision: '6ffceedb1544001d998ef209c14af73d' },
        { url: '/logo512.png', revision: 'de3ca3888ae02f042f1b57acad6da697' },
        { url: '/manifest.json', revision: '08d33c00779a951d4a1b9fc12300ceb8' },
        { url: '/robots.txt', revision: 'fa1ded1ed7c11438a9b0385b1e112850' },
        { url: '/site.webmanifest', revision: '16ce9348ed8042c80163269502e90f4f' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: i }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET',
    );
});
