import { useAppState } from "@/components/Skaper/AppState";

import './ImageSize.css';

function ImageSize() {
    const { imageSize } = useAppState();

    return (
        <fieldset class="ImageSize">
            <label htmlFor="skaper-size">
                Image Size:
            </label>
            <div className="skaper-input-container">
                <select
                    name="skaper-size"
                    id="skaper-size"
                    value={imageSize}
                    onChange={(e) => {
                        const newValue = (e.target as HTMLSelectElement).value;
                        imageSize.value = newValue === 'og' ? 'og' : 'twitter';
                    }}
                >
                    <option value="og">1200 × 630 (og:image)</option>
                    <option value="twitter">1200 × 675 (twitter:image)</option>
                </select>
            </div>
        </fieldset>
    );
}

export default ImageSize;