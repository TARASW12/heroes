/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import '@/global.css';
import {GluestackUIProvider} from './src/components/ui/gluestack-ui-provider';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';
import Navigation from './src/navigation';

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </GluestackUIProvider>
  );
}
