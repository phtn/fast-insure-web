if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let r={};const t=e=>a(e,n),f={module:{uri:n},exports:r,require:t};s[n]=Promise.all(c.map((e=>f[e]||t(e)))).then((e=>(i(...e),r)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/078dd349-6e508b7e1a5231b8.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/0e5ce63c-40fe53e709b7109c.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/118-ffe37d1a96d92b12.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/122-e700f84f58e072b0.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/135-0934cd93bdfca24a.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/148-5b34a983ddbc5cd1.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/403-912db0c89aed767f.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/465-19506b7610e30e2d.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/468-53fff57b33ba753b.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/515-0a14d638be5efb2f.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/552-efc2540c5582bc6e.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/642-d2d7eb32c895ec2f.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/749-e048d17de3ed1232.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/780-fc61b09d60685b46.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/792-b0fa8709ca193aed.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/838-8a93189f751b03e5.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/840-5e211c58cbf36999.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/934-ec77ea501b885e07.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/_not-found-f0e4e34c134f6f9a.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/account/@dashboard/life/page-aca386408441625e.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/account/@dashboard/page-a0e37b77cab8b2ae.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/account/@dashboard/profile/page-ee45562ef3cfedd1.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/account/@dashboard/settings/page-973e24a9ceb80457.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/account/@dashboard/travel/page-fec7389975ffb0d3.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/account/@signin/page-170529b625be9d9f.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/account/layout-4750121a14bf14b7.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/account/page-b1029c365728ab44.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/autoloans/page-de09460ced9af6cc.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/checkout/page-1f8522b33fab9d6a.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/layout-d43dadf3b1b75eef.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/page-c5721a2aa9c4616b.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/payment-status/page-f658dc9add8daa57.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/app/products/page-4e63cdc179963938.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/bc9e92e6-f7452e0c5a29c98e.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/fd9d1056-2a360b7781d85339.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/framework-ecc7c29b98f29b59.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/main-1fd0710551819455.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/main-app-9ec12dd858ccb630.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-0dd4725161792b31.js",revision:"xLa8RYwcT8FLpGQmMI8OS"},{url:"/_next/static/css/bb9085d3bb5f8a90.css",revision:"bb9085d3bb5f8a90"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/1429ac147cec8c62-s.woff2",revision:"b6d961ab16deb638b4487348182e5d55"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/94ed5e3ccd860582-s.woff2",revision:"46a7090dcc6f2ae12601b8728b78c30e"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/cef5c00efc6bce72-s.p.woff2",revision:"f501835b53f984217301270f6131fdaf"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/f980ec13b5b5e554.p.woff2",revision:"c3066a48c8b1a6b3b2bab94f006e39d1"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/xLa8RYwcT8FLpGQmMI8OS/_buildManifest.js",revision:"e0a21c7d7f93d89dce16df0231dc76f2"},{url:"/_next/static/xLa8RYwcT8FLpGQmMI8OS/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/app.webmanifest",revision:"acf5dd2ca4df81eddcea965da0f94cc6"},{url:"/bg/city_v1.webp",revision:"9ddcfca309c3598aeaa0f5d521cbce23"},{url:"/bg/city_v2.webp",revision:"583c5ff61bd08b0c313fb3e825f5aeb0"},{url:"/bg/dark_v1.svg",revision:"d630752624ce914640d6aff18dfc0719"},{url:"/bg/flash_v1.svg",revision:"9495f7060a1bf1057eb69c035f1bd675"},{url:"/bg/flash_v2.svg",revision:"942c951b6a982d88abcaff8bb3ed4d2d"},{url:"/bg/flash_v3.svg",revision:"eb375206d394e6609c4b8ba166ec9391"},{url:"/bg/flash_v4.svg",revision:"2c3435c81da6af0a14458a4e6fc0aa4a"},{url:"/bg/flash_v5.svg",revision:"f092e8a6c604679ee388febafe88c608"},{url:"/bg/pattern_v1.webp",revision:"62971e707643f732eab360f9f9ae30ff"},{url:"/favicon.ico",revision:"7f98bbc43ba0d1dbf3564adf0821a304"},{url:"/favicon.svg",revision:"d6a9b305c11f6a7451531494580db08b"},{url:"/icons/fast_blue.svg",revision:"b1d68710a80471012b03e4f7728e9ecc"},{url:"/icons/fast_dark_512.svg",revision:"e2d40df31515ebb810ac4e58d67e9dff"},{url:"/icons/fast_easy_1024.svg",revision:"abd36a924b6aaae9fb0b8ccfd615dcf0"},{url:"/icons/fast_easy_144.png",revision:"d88703c6d6ce9cce13c4d30fe8274f02"},{url:"/icons/fast_easy_144.svg",revision:"d0c49a2ede4a0f34b0f9d69e29cafb8f"},{url:"/icons/fast_easy_16.png",revision:"8338c72401dd0ad08c4ebeb94d3ce3f5"},{url:"/icons/fast_easy_180.png",revision:"e0e106f9eafa562de27059fdd4cf27de"},{url:"/icons/fast_easy_32.png",revision:"e2243742e74ae517fa0309dbff72e710"},{url:"/icons/fast_easy_512.svg",revision:"700a7eb0b329866a26838fae22c11fad"},{url:"/icons/fast_favicon.png",revision:"9b14b26fa4a768a70180433eb959e229"},{url:"/icons/fast_favicon_16.png",revision:"d492b90a3cbdb3413271be45c7bfb579"},{url:"/icons/fast_favicon_167.png",revision:"a8f97d98af59af371f316b9cd03bbd88"},{url:"/icons/fast_favicon_180.png",revision:"10d63706992adb8cad1aa3f177eec2db"},{url:"/icons/fast_favicon_192.png",revision:"ebb591c4bfae7b689a9bbe7267a923ff"},{url:"/icons/fast_favicon_32.png",revision:"db2749c0db6f94177599b40dbea6290e"},{url:"/icons/fast_favicon_48.png",revision:"824146ff87c5f1fd9c19be27152b6bcf"},{url:"/icons/fast_favicon_512.png",revision:"e4661656050d0e5b00297f2e1d3338f9"},{url:"/icons/fast_favicon_96.png",revision:"f87e907c894ae1f37ebc72f007ca37d5"},{url:"/icons/fast_favicon_v2.png",revision:"e420f8bff5891320ca46981edc083422"},{url:"/icons/fast_global_1024.svg",revision:"f6d575eb08127516b885cb7d19acb784"},{url:"/icons/fast_global_144.png",revision:"3589f30fe4a99364b1c8ceef9da979d5"},{url:"/icons/fast_global_144.svg",revision:"0778b3e9b6e1d38f418bbad64fb37d12"},{url:"/icons/fast_global_512.svg",revision:"707aeafb5202afc821367912b7e9ae4d"},{url:"/icons/icon_dark_1024.png",revision:"d4c87e6a0e7c8a039841e944a7885ba1"},{url:"/icons/icon_dark_512.png",revision:"417e8776f1d6020967a80a5d1d2bae5a"},{url:"/icons/icon_easy_512.png",revision:"dc92bee0b73f8761a3bb47e97729a891"},{url:"/icons/icon_light_1024.png",revision:"c2b99fc14ce196c7407ebb92e8912814"},{url:"/icons/icon_metal_144.svg",revision:"e789b245575f74d974a6cb0a7804a51e"},{url:"/icons/icon_metal_512.png",revision:"86d7fa1f588a96db26e64e505c31a734"},{url:"/icons/icon_zima_144.svg",revision:"f927462f9f50de69bb0b7f45e81b359c"},{url:"/icons/icon_zima_512.svg",revision:"eca3dfcd19cc76cb2c5eedd05430c30a"},{url:"/images/handheld_v1.png",revision:"c660c2f3c3a6747b3b283ecd5746c820"},{url:"/images/handheld_v2.png",revision:"d8398061b4ed3e337bc99860e3428d0d"},{url:"/images/spyder.webp",revision:"b8e8b8be92aefe44f12d2785720885a4"},{url:"/logo/autoprotect_logo.png",revision:"b3fc49189f576718f976e62a73970c0e"},{url:"/logo/fastinsure_logo_dark.png",revision:"0c4c08516ee5b43f0e3e64dafa394b6e"},{url:"/logo/fastinsure_logo_light.png",revision:"71508fcc229452142965bfba2b3b556b"},{url:"/logo/fi_logo_v1.svg",revision:"17a648e3ca71b839ee481724546a0337"},{url:"/logo/fi_logo_v2.svg",revision:"d6a9b305c11f6a7451531494580db08b"},{url:"/peaks/peaks_v1.svg",revision:"0154a29bea1535d3c33a3560ac20e5e1"},{url:"/peaks/peaks_v10.svg",revision:"b6e72e0d75112c943738e2c83eef15b2"},{url:"/peaks/peaks_v2.svg",revision:"a93430de3110443245a4e13cddcd6eb1"},{url:"/peaks/peaks_v3.svg",revision:"086b31da937b9e4670008d14b7f693bf"},{url:"/peaks/peaks_v4.svg",revision:"5350e849d2f37d523bb511210a89be45"},{url:"/peaks/peaks_v5.svg",revision:"047f10266886ca03e9d160a44fd3d92a"},{url:"/peaks/peaks_v6.svg",revision:"1b4b5bb2d5f3d93e9820efbc618b1024"},{url:"/peaks/peaks_v7.svg",revision:"95d47c3a757034ff493b04aba73c6b4c"},{url:"/peaks/peaks_v8.svg",revision:"9559b83aef5b747b7e5add8bc3ad2508"},{url:"/peaks/peaks_v9.svg",revision:"6b12e0a389b9c121e1ded5506a46a8b7"},{url:"/screenshots/ss_add.jpeg",revision:"cf68846f35597635a4235ed3296889a2"},{url:"/screenshots/ss_add_800.png",revision:"41f4579a07773427f082e1425f775c0c"},{url:"/screenshots/ss_ctpl.jpeg",revision:"735559a779521186cadc5ec100cc8464"},{url:"/screenshots/ss_ctpl_800.png",revision:"19f2d009fe7dbb8cf85d5655c06ef561"},{url:"/screenshots/ss_ctpl_mobile.jpg",revision:"bf540f0067fca7aa0c221d42cd48edb5"},{url:"/screenshots/ss_features_mobile.jpg",revision:"45ee409a7f1fc0c011a8528a9fc4176d"},{url:"/screenshots/ss_landing.jpeg",revision:"84d086fa52ae0287dff36dd33148bbea"},{url:"/screenshots/ss_landing_800.png",revision:"35cce1e7987335cbc0aabf43a3295c8f"},{url:"/screenshots/ss_landing_mobile.jpg",revision:"a552fccdc54cb134bc13e3ca6945d153"},{url:"/screenshots/ss_mobile_portrait.png",revision:"48bf311258114184051e0a28fc5b6348"},{url:"/screenshots/wp_fast_zima_ultra.png",revision:"f5c376fcc08af9be4eab34a1f83c9bef"},{url:"/stores/appgallery.svg",revision:"846d4df59f2de20c475bacec407620f7"},{url:"/stores/appstore.svg",revision:"93d1342aa4cd292f5b69e9fbeb2c978a"},{url:"/stores/appstore_light.svg",revision:"6994406a8e9ff0d9a31edb68645cbdac"},{url:"/stores/playstore.svg",revision:"19cd4e47e291ed695d2d138d6c55a528"},{url:"/svg/amber_v1.svg",revision:"e6d6c05f5656c358f76b293ec73869c4"},{url:"/svg/caesar.svg",revision:"ca4773e18661ffaf47eac45119a399c9"},{url:"/svg/caesar_dark_v1.svg",revision:"c782d564bd947817d1e47bd8f8cc4a80"},{url:"/svg/caesar_gold_v1.svg",revision:"d591c251742109485f1c2a835057e377"},{url:"/svg/caesar_v2.svg",revision:"e46e7d2acae644c821603bb0d74bff18"},{url:"/svg/dev_v1.svg",revision:"d2b3925e58dbe6e812c6a6ba9d0787f9"},{url:"/svg/dots.svg",revision:"06670980214c034487c77d3a9786c333"},{url:"/svg/g_logo.svg",revision:"edd0e34f60d7ca4a2f4ece79cff21ae3"},{url:"/svg/ninja_v1.svg",revision:"979f578d8d23d456c0bfe7e0d644e55b"},{url:"/svg/ninja_v2.svg",revision:"61f72378f25e26a8c5f4a55336d7f5eb"},{url:"/svg/ph.svg",revision:"aecde7c851538177056efd4a32f27d61"},{url:"/svg/print_v1.svg",revision:"45e7ce47b3936e6f2abdceee3c2523bb"},{url:"/svg/print_v2.svg",revision:"14e5dec65e7dc1df0584b26165dcb1d2"},{url:"/svg/print_v3.svg",revision:"cebe23eb65f2495f817b6d23a60018a8"},{url:"/svg/sat_v1.svg",revision:"7103952a986589bf75fb7c4fe509b498"},{url:"/svg/webdev_v1.svg",revision:"3a3bbe75efafe49e5dee10ab8f378511"},{url:"/svg/world.svg",revision:"90d163443dbffa9b2bf38e0872fdbde6"},{url:"/swe-worker-4da67dda9bc18c53.js",revision:"5a47d90db13bb1309b25bdf7b363570e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
