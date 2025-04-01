# Firebase Realtime Database Test App

A simple Angular application demonstrating real-time data synchronization using Firebase Realtime Database.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure Firebase:
- Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Realtime Database
- Copy your Firebase configuration to `src/environments/environment.ts`

3. Run the application:
```bash
npm start
```

## Deployment

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init
```
- Select Hosting
- Select your Firebase project
- Use `dist/find-your-loved-one` as your public directory
- Configure as a single-page app: Yes
- Don't overwrite index.html: No

4. Build the application:
```bash
npm run build
```

5. Deploy to Firebase:
```bash
firebase deploy
```

## GitHub Setup

1. Initialize Git repository:
```bash
git init
```

2. Create .gitignore file:
```bash
echo "node_modules/
dist/
.firebase/
*.log" > .gitignore
```

3. Add and commit files:
```bash
git add .
git commit -m "Initial commit"
```

4. Create a new repository on GitHub and push:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## Features
- Real-time counter updates
- Firebase Realtime Database integration
- Responsive design
- Easy deployment to Firebase Hosting
