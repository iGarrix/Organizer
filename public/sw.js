if(!self.define){let e,s={};const t=(t,i)=>(t=new URL(t+".js",i).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let n={};const u=e=>t(e,c),r={module:{uri:c},exports:n,require:u};s[c]=Promise.all(i.map((e=>r[e]||u(e)))).then((e=>(a(...e),n)))}}define(["./workbox-e9849328"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"68e9e53e5df4de04c4e8dc9bec8079ea"},{url:"/_next/static/chunks/06807f6d-8c9278be76f0d4c7.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/1919-205ff6e4c06f7b60.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/1b7bc3a5-cdd7ee2c74034dfd.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/2b82e3ad-40effb114d295a37.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/3193-e1cba59461da364c.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/35631907-b9b4d21f524243bd.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/3633-a45eed07d912d561.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/3663-03462a5fbd197954.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/387-2d14dec3f0d57de2.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/3976-e2dc56b85db7349f.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/3f3a8ed7-44df61967856835b.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/4490-214c81dda7f17a6b.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/4849-1f58c1d14b25bd4b.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/4918df7f-5c2ff6c0eae754d4.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/5209-7374298dfdc4ef75.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/5535-b98727666994145d.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/59453ef0-15d72885d0c1117e.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/5954-5f51ca589fdf61fe.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/6670-2994987d43ba6a18.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/6915-78fb19c7f1b2bbf5.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/7032-bbd667631064da1a.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/7affd55c-e61a603927bc3484.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/7d1cab45-24a59f0445af4dff.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/8-56748e9947540adc.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/8305-580b1dd0f980737d.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/842892ce-5dedea192ac628ed.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/86cb00e6-67ef10a18b2cb6f2.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/8935-12876848e49f3365.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/8f130de0-3e3010eb5950b9a4.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/9590-f85d8ad68fdbaf49.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/9963-0c1936749cd1705f.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/9f8fe0c5-db313360405b4f34.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/%5B...notFound%5D/page-8a26d05433cdabf5.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/backup/layout-5c5df4af957de244.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/backup/page-f177f2792b82a69d.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/fields/page-e39e8fe50110d05b.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/layout-230c0c67a44a99f3.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/new-task/layout-931531a809978d36.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/new-task/page-3d1ae6a9cbc31130.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/notice/%5Barticle%5D/layout-479b92e6c0e13395.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/notice/%5Barticle%5D/page-7138f7da075ff4a7.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/notice/layout-177c63099febf605.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/notice/new/page-886eb0433e4a0218.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/notice/page-51b4f656b4753bd3.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/page-5fa8503e06489a35.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/task/%5BtaskId%5D/layout-479a1e3e0e5e1b15.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/(workflow)/task/%5BtaskId%5D/page-5f8c956660afc9a4.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/_not-found/page-d41eeb26160ceb2d.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/layout-8887cd068be31f40.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/not-found-7b64c1013f5caacb.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/setup/layout-ea742fd99bd35463.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/app/setup/page-0348363192d82bd3.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/b8bc3934-d1ab592b7becc866.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/d8d67af5-68fb96578557d06d.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/e9700330-3ad6adb9ba4027ca.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/eb396988-7044f8fa3d3677fd.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/efedfc4a-638d8692ec5a4ab8.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/f2eb1761-55f7ae403b59c117.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/framework-63a5d844a3662ade.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/main-989708db2365ef0e.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/main-app-54a351021f350860.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/pages/_app-240c1ce9aea729b1.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/pages/_error-2bd1f95257b633c4.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-7fc2525870abb30b.js",revision:"qT9iMEkNSwWE5HekzCuQt"},{url:"/_next/static/css/86534f2b9e54dd3c.css",revision:"86534f2b9e54dd3c"},{url:"/_next/static/css/aa5ab92863040607.css",revision:"aa5ab92863040607"},{url:"/_next/static/css/b28636bfd3be9bf3.css",revision:"b28636bfd3be9bf3"},{url:"/_next/static/css/f30989a8d6d227e5.css",revision:"f30989a8d6d227e5"},{url:"/_next/static/media/122c360d7fe6d395-s.p.woff2",revision:"9b2795fb691d8f8a83312a4436f5a453"},{url:"/_next/static/media/1a142ec2652f2d06-s.woff2",revision:"be388d4ee0f6f0e3c704c90545794e2d"},{url:"/_next/static/media/1b3800ed4c918892-s.p.woff2",revision:"e253ab00a4ae4563e11649db12bf94ed"},{url:"/_next/static/media/2053df8159b25386-s.woff2",revision:"89a487243655b1945e8b173e3632e315"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/4c5ce8dda3f2e57a-s.woff2",revision:"03cf188204d8993592a82cbacd11f870"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/64ea2a5aaa4dedd3-s.woff2",revision:"9b04ab384e20d8caa6e96f623bdd9a23"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/797ceaad3c9a531e-s.woff2",revision:"d55229de741075f3bc957f837914716d"},{url:"/_next/static/media/891487401855818d-s.woff2",revision:"c39f8c869c3ce6e1cecf63da09b0c4f4"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/9bbb7f84f3601865-s.woff2",revision:"d8134b7ae9ca2232a397ef9afa6c8d30"},{url:"/_next/static/media/9d9b9cae20d87d18-s.woff2",revision:"5fd8c4e4408334cab1a4eb5280e70ff1"},{url:"/_next/static/media/9f05b6a2725a7318-s.woff2",revision:"afbfd524bdefea1003f0ee71b617e50e"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/a8eac78432f0a60b-s.woff2",revision:"be605f007472cc947fe6b6bb493228a5"},{url:"/_next/static/media/b63e4df112f8dce1-s.woff2",revision:"bfd216fcfe1902b6c614806673a86381"},{url:"/_next/static/media/bbe178ab8b70b75e-s.woff2",revision:"0788467ba47dd3aecc4dff229dd13a2f"},{url:"/_next/static/media/c740c1d45290834f-s.woff2",revision:"bff99a4bbc4740c49b75b52f290be90e"},{url:"/_next/static/media/c89cfa4ee44cbc90-s.woff2",revision:"265b689bbce63c706c7cfe1b9403bf27"},{url:"/_next/static/media/d0697bdd3fb49a78-s.woff2",revision:"50b29fea20cba8e522c34a1413592253"},{url:"/_next/static/media/dba81c1208da12ee-s.p.woff2",revision:"61ad024295cbcb211b4fda1d44905bf9"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/favicon.413dec7f.ico",revision:"f386315d8985511ba06235d8a4ec2763"},{url:"/_next/static/qT9iMEkNSwWE5HekzCuQt/_buildManifest.js",revision:"29aabc55df3e0e68a27f6fe4f50b77d3"},{url:"/_next/static/qT9iMEkNSwWE5HekzCuQt/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/pwa-image-192.png",revision:"c0894c8fee0d360780ca3a9cd0adce06"},{url:"/pwa-image-512.png",revision:"77ef683e700f3cb575f5c58938e38cdc"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
