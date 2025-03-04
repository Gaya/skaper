import './Config.css';

function Config() {
    return (
        <aside className="Config">
            <fieldset>
                <label for="skaper-size">
                    Image Size
                </label>
                <select name="skaper-size" id="skaper-size">
                    <option value="og">1200 x 630 (og:image)</option>
                    <option value="twitter">1200 x 675 (twitter:image)</option>
                </select>
            </fieldset>
        </aside>
    );
}

export default Config;