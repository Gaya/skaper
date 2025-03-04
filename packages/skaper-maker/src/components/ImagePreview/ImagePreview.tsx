import classNames from "classnames";

import { imageSize } from "@/components/signals";

import './ImagePreview.css';

function ImagePreview() {
    return (
        <section class="ImagePreview">
            <div class={classNames('Image', { 'Twitter': imageSize.value === 'twitter' })}>
                <span class="Dimensions">
                    Dimensions: {imageSize.value === 'twitter' ? '1200 × 675' : '1200 × 630'}
                </span>
            </div>
        </section>
    )
}

export default ImagePreview;