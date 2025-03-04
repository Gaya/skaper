import { imageSize } from "@/components/signals";

import './Config.css';

function Config() {
    return (
        <aside class="Config">
            <fieldset>
                <label for="skaper-size">
                    Image Size
                </label>
                <div class="skaper-input-container">
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
        </aside>
    );
}

export default Config;