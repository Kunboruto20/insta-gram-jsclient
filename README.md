# client-node-js-insta

Client Node.js pentru Instagram.com, scris în JavaScript pur (fără TypeScript, fără browser automation), care emulează comportamentul unui client real web Instagram.

## Funcționalități principale
- Autentificare cu username/email + parolă
- Gestionare sesiune (cookie-uri, token-uri)
- Trimitere/primire mesaje directe (DM)
- Upload și postare story-uri, statusuri, reels, imagini, video
- Vizualizare și interacțiune cu feed, profiluri, comentarii

## Structură proiect

```
client-node-js-insta/
├── src/
│   ├── auth/         # Autentificare, gestionare sesiune
│   ├── dm/           # Mesaje directe
│   ├── media/        # Upload media, story, reels
│   ├── feed/         # Feed, profiluri, comentarii
│   ├── utils/        # Cookie-uri, token-uri, headers
│   └── index.js      # Export principal
├── package.json
└── README.md
```

## Instalare

```bash
npm install client-node-js-insta
```

## Exemplu de utilizare

```js
const InstaClient = require('client-node-js-insta');
// ...
```