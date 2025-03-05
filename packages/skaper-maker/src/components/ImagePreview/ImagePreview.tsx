import classNames from "classnames";

import { useAppState } from "@/components/Skaper/AppState";

import ImageSize from "./ImageSize";

import './ImagePreview.css';

function ImagePreview() {
    const { imageSize } = useAppState();

    return (
        <section class="ImagePreview">
            <ImageSize />
            <div class={classNames('Image', { 'Twitter': imageSize.value === 'twitter' })}>
            </div>
        </section>
    )
}

export default ImagePreview;