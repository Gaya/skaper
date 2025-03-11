import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { PropsWithChildren } from 'preact/compat';
import { signal } from '@preact/signals';

import { HAlign, ImageSize, VAlign } from 'skaper';

import { FONTS } from '@/common/fonts';

const createDefaultAppState = () => ({
  imageSize: signal<ImageSize>('og'),
  background: {
    image: signal<string | undefined>(undefined),
    color: signal<string>('#ffffff'),
  },
  title: {
    font: signal<keyof typeof FONTS>('Roboto'),
    color: signal<string>('#ffffff'),
    enableHighlight: signal<boolean>(true),
    highlightColor: signal<string>('#000000'),
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
