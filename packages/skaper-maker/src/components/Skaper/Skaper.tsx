import Config from "@/components/Config/Config";
import ImagePreview from "@/components/ImagePreview/ImagePreview";

import AppStateProvider from "./AppState";

import './App.css';
import './Skaper.css';

function Skaper() {
    return (
        <AppStateProvider>
            <div id="skaper-maker">
                <header>Skaper Maker</header>
                <div class="skaper-container">
                    <Config />
                    <div class="skaper-image-container">
                        <ImagePreview />
                    </div>
                </div>
            </div>
        </AppStateProvider>
    );
}

export default Skaper;