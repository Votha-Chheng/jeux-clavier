import LoadingScreen from '@/components/shared-UI/LoadingScreen'
import { wrapper } from '@/store/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

function App({ Component, ...rest }: AppProps) {
  const { store, props} = wrapper.useWrappedStore(rest)
  const { pageProps } = props;

  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen/>} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>

  )
}

export default App
