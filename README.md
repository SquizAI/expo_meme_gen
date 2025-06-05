# Social Media Meme Generator

An Expo-powered mobile application for creating, customizing, and sharing memes using OpenAI's image generation technology.

## Features

- Generate custom memes using OpenAI's gpt-image-1 model
- Choose from popular meme templates or create your own
- Add custom text with styling options
- AI-powered chat assistant to help with meme ideas
- Save and share memes to popular social media platforms

## Tech Stack

- React Native + Expo
- OpenAI API (gpt-image-1 for image generation)
- OpenAI Structured Output API for chat functionality
- AsyncStorage for local data persistence
- React Navigation for app navigation

## Project Structure

```
meme-generator-app/
├── assets/               # Images, fonts, and static files
├── docs/                 # Documentation files
│   ├── development_plan.md  # Development roadmap
│   └── tasks.md          # Detailed task list
├── src/
│   ├── screens/          # App screens
│   ├── components/       # Reusable UI components
│   ├── services/         # API integrations and services
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   └── constants/        # App constants and config
```

## Setup Instructions

1. Clone the repository
2. Run `npm install` or `yarn install`
3. Create a `.env` file with your OpenAI API key
4. Run `npx expo start` to launch the development server

## Environment Variables

Create a `.env` file in the root of the project with the following:

```
OPENAI_API_KEY=your_api_key_here
```

## Development

Check the `docs/development_plan.md` file for the project roadmap and development phases.
For specific tasks, refer to `docs/tasks.md`.

## License

MIT
