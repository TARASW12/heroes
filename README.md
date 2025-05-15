# Hero Search React Native App

This is a React Native application for searching and managing superheroes.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js & npm/Yarn:** You will need Node.js (LTS version recommended) and npm (which comes with Node.js) or Yarn installed on your system.
  - [Node.js download](https://nodejs.org/)
  - [Yarn installation](https://classic.yarnpkg.com/en/docs/install)
- **React Native Development Environment:** Follow the official React Native documentation to set up your development environment for your specific OS (macOS, Windows, Linux) and target mobile platforms (iOS, Android).
  - Go to [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) and select the **React Native CLI Quickstart** tab.
  - Ensure you have installed the necessary dependencies for your target platform (e.g., Xcode for iOS, Android Studio & Android SDK for Android).
- **CocoaPods (for iOS development):** If you plan to run the app on iOS, you will need CocoaPods.
  - [CocoaPods installation](https://guides.cocoapods.org/using/getting-started.html)

## Setup and Installation

1.  **Clone the repository (if applicable):**

    ```bash
    git clone <repository-url>
    cd hero
    ```

2.  **Install project dependencies:**
    Navigate to the project's root directory (`hero`) in your terminal and run:

    ```bash
    npm install
    ```

    or if you prefer Yarn:

    ```bash
    yarn install
    ```

3.  **Install iOS Dependencies (if developing for iOS):**
    Navigate to the `ios` directory and install the CocoaPods dependencies:
    ```bash
    cd ios
    pod install
    cd ..
    ```

## Running the Application

Ensure you have an emulator running or a physical device connected and configured for development.

1.  **Start the Metro Bundler:**
    In the project root directory (`hero`), open a new terminal window and run:

    ```bash
    npm start
    ```

    or with Yarn:

    ```bash
    yarn start
    ```

    Keep this terminal window open.

2.  **Run on Android:**
    In another terminal window (still in the project root directory `hero`), run:

    ```bash
    npm run android
    ```

    or with Yarn:

    ```bash
    yarn android
    ```

3.  **Run on iOS:**
    In another terminal window (still in the project root directory `hero`), run:
    ```bash
    npm run ios
    ```
    or with Yarn:
    ```bash
    yarn ios
    ```
    Alternatively, you can open the `.xcworkspace` file in the `ios` folder with Xcode and run the project from there.

## Troubleshooting

- **"Failed to get the SHA-1 for..." error in Metro:** Try resetting the cache when starting Metro:
  ```bash
  npm start -- --reset-cache
  ```
  or
  ```bash
  yarn start --reset-cache
  ```
- **iOS build issues:** Ensure CocoaPods are correctly installed and up to date. Sometimes, cleaning the build folder in Xcode (Product > Clean Build Folder) can help.
- **Android build issues:** Ensure your Android SDK and build tools are correctly configured. Check Android Studio for any SDK-related errors.

This README provides a basic guide. Depending on the project's specific native modules or configurations, additional setup steps might be required.
