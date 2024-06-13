# Next.js + Firebase Auth Template

Next.js website template using [Firebase Authentication](https://firebase.google.com/docs/auth).

## Installation

```bash
npm install
```

## Usage

A Firebase project must be created and connected to the app via the folowing environment variables, which can be placed inside `.env.local`:

- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

The project is then set-up to utilize [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite) during local development.

Start Next.js dev server:

```bash
npm run dev
```

Start Auth Emulator (requires [Firebase CLI](https://firebase.google.com/docs/cli)):

```bash
firebase emulators:start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
