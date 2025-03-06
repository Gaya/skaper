import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { PropsWithChildren } from 'preact/compat';
import { signal } from '@preact/signals';

import { HAlign, ImageSize, VAlign } from 'skaper';

const createDefaultAppState = () => ({
  imageSize: signal<ImageSize>('og'),
  title: {
    color: signal<string>('#ffffff'),
    hAlign: signal<HAlign>('left'),
    vAlign: signal<VAlign>('top'),
  },
});

type AppStateProps = ReturnType<typeof createDefaultAppState>

const AppState = createContext<AppStateProps>(createDefaultAppState());

export function useAppState() {
  return useContext(AppState);
}

function AppStateProvider({ children }: PropsWithChildren) {
  return (
    <AppState.Provider value={createDefaultAppState()}>
      {children}
    </AppState.Provider>
  );
}

export default AppStateProvider;
