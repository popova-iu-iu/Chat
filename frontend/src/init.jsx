/* eslint-disable */
import React from 'react';
import i18next from 'i18next';
import leoProfanity from 'leo-profanity';

import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as ProviderRollBar, ErrorBoundary } from '@rollbar/react';

import App from './App';

import ru from './locales/ru';
import store from './store';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR,
  environment: 'production',
};

const init = async (socket) => {
  leoProfanity.add(leoProfanity.getDictionary('ru'));

  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources: { ru },
    fallbackLng: 'ru',
  });

  const vdom = (
    <ProviderRollBar config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <I18nextProvider i18n={i18n}>
            <App socket={socket} />
          </I18nextProvider>
        </StoreProvider>
      </ErrorBoundary>
    </ProviderRollBar>
  );

  return vdom;
};

export default init;
