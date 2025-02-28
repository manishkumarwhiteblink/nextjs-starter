'use client';

import { Provider } from 'react-redux';
import { persistor, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Loader2 } from 'lucide-react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}