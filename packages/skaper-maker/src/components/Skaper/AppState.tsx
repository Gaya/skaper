import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { PropsWithChildren } from 'preact/compat';
import { Signal, signal } from '@preact/signals';

type ImageSize = 'og' | 'twitter';
type HAlign = 'left' | 'center' | 'right';
type VAlign = 'top' | 'middle' | 'bottom';

interface AppStateProps {
  imageSize: Signal<ImageSize>;
  titleHAlign: Signal<HAlign>;
  titleVAlign: Signal<VAlign>;
}

const createDefaultAppState: () => AppStateProps = () => ({
  imageSize: signal<ImageSize>('og'),
  titleHAlign: signal<HAlign>('left'),
  titleVAlign: signal<VAlign>('top'),
});

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
