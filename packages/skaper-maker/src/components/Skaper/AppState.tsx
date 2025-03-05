import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { PropsWithChildren } from "preact/compat";
import { Signal, signal } from "@preact/signals";

type ImageSize = 'og' | 'twitter';

interface AppStateProps {
    imageSize: Signal<ImageSize>;
}

const createDefaultAppState: () => AppStateProps = () => ({
    imageSize: signal<ImageSize>('og'),
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
    )
}

export default AppStateProvider;