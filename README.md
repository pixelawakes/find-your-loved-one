# Find Your Loved One

A web application to help find missing persons using AI-powered image matching.

## Features

- Report missing persons with photos and details
- AI-powered image matching
- Real-time database storage
- Responsive design

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project
   - Copy your Firebase configuration to `src/environments/environment.ts`
4. Run the development server:
   ```bash
   ng serve
   ```

## Deployment

The application is deployed to Firebase Hosting:
```bash
firebase deploy
```

## Branch Structure

- `main` - Production-ready code
- `develop` - Development branch
- Feature branches - Created from `develop` for specific features

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Submit a pull request to `develop`
4. After review, merge to `develop`
5. When ready for production, merge `develop` to `main`

## License

This project is licensed under the MIT License.
