import './App.css';
import './Skaper.css';

import Config from "../Config/Config";
import ImagePreview from "../ImagePreview/ImagePreview";

function Skaper() {
    return (
        <div id="skaper-maker">
            <header>Skaper Maker</header>
            <div className="skaper-container">
                <Config />
                <ImagePreview />
            </div>
        </div>
    );
}

export default Skaper;