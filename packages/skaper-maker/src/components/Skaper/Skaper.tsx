import Config from "@/components/Config/Config";
import ImagePreview from "@/components/ImagePreview/ImagePreview";

import './App.css';
import './Skaper.css';

function Skaper() {
    return (
        <div id="skaper-maker">
            <header>Skaper Maker</header>
            <div class="skaper-container">
                <Config />
                <div class="skaper-image-container">
                    <ImagePreview />
                </div>
            </div>
        </div>
    );
}

export default Skaper;