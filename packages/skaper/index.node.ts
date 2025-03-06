import { readFileSync } from "node:fs";
import { join } from "node:path";

import { parse, HTMLElement } from 'node-html-parser';
import { createCanvas, loadImage, registerFont } from 'canvas';
import sharp from 'sharp';
import { RequestInfo, RequestInit } from 'node-fetch';

import formatTitle from './lib/formatTitle';

const fetch = (url: RequestInfo, init?: RequestInit) =>  import('node-fetch')
    .then(({ default: fetch }) => fetch(url, init));

registerFont(join(__dirname, 'assets/JetBrainsMono-Medium.ttf'), { family: 'JetBrainsMono' });

export interface SiteConfig {
    baseUrl: string;
    selector?: string;
    background?: string;
    logo?: string;
    imagePath?: string;
    getTitle?: (body: HTMLElement, config: SiteConfig) => string | undefined;
    getFirstImage?: (body: HTMLElement, config: SiteConfig) => string | undefined;
    resolveImage?: (src: string, config: SiteConfig) => Promise<ArrayBuffer>;
}

const defaultConfig: Required<Pick<SiteConfig, "resolveImage" | "getTitle" | "getFirstImage">> = {
    getTitle: (body) => body.querySelector('h1')?.textContent,
    getFirstImage: (body) => body.querySelector('img')?.attrs.src,
    resolveImage: (src: string, config: SiteConfig): Promise<ArrayBuffer> => {
        const imgUrl = !src.startsWith('http')
            ? [config.baseUrl, src].join('')
            : src;

        console.info('Fetching first image', imgUrl);
        return fetch(imgUrl).then((i) => i.arrayBuffer());
    }
};

export async function generateImage(
    root: HTMLElement,
    conf: SiteConfig,
) {
    const config = { ...defaultConfig, ...conf };

    const body = root.querySelector(config.selector || 'body');

    if (!body) {
        throw new Error(`Could not find body on '${config.selector}'`);
    }

    const title = config.getTitle(body, config);
    const firstImage = config.getFirstImage(body, config);

    const width = 1200;
    const height = 630;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = config.background || "#000";
    ctx.fillRect(0, 0, width, height);

    if (firstImage) {
        const imgBuffer = await config.resolveImage(firstImage, config);

        console.info('Resizing image');
        const resized = await sharp(imgBuffer)
            .resize(width, height)
            .png()
            .toBuffer();

        console.info('Drawing image');
        const img = await loadImage(resized);
        ctx.drawImage(img, 0, 0);
    }

    if (config.logo) {
        const imgBuffer = readFileSync(config.logo);

        const resized = await sharp(imgBuffer)
            .resize(firstImage ? 200 : 300, undefined)
            .toBuffer();

        const img = await loadImage(resized);

        if (firstImage) {
            ctx.drawImage(img, 46, 46);
        } else {
            ctx.drawImage(img, (width / 2) - (img.width / 2), 46);
        }
    }

    ctx.font = "72px JetBrainsMono";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    const titlePadding = 46;
    const maxTitleWidth = width - (titlePadding * 2);

    const lines = formatTitle(title || 'No title', maxTitleWidth, ctx as unknown as CanvasRenderingContext2D);
    const lineHeight = ctx.measureText('lines').emHeightDescent;

    const top = height - (lineHeight * lines.length) - titlePadding;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const backgroundPadding = titlePadding / 4;

        ctx.fillStyle = "#fff";
        ctx.fillRect(
            titlePadding - backgroundPadding,
            top + (lineHeight * i),
            ctx.measureText(line).width + (backgroundPadding * 2),
            lineHeight,
        );
    }

    ctx.fillStyle = "#000";
    ctx.fillText(lines.join('\n'), titlePadding, top);

    const buffer = canvas.toBuffer("image/jpeg");
    return sharp(buffer).jpeg({ mozjpeg: true }).toBuffer();
}

function fetchHTMLFromURL(url: string): Promise<string> {
    return fetch(url).then((res) => res.text());
}

export function generateImageFromURL(config: SiteConfig, path: string) {
    const url = [config.baseUrl, path].join('/');

    console.info(`Fetching data from ${url}`);

    return fetchHTMLFromURL(url)
        .then(parse)
        .then((root) => generateImage(root, config));
}

export function parseHTML(html: string): HTMLElement {
    return parse(html);
}

export default generateImage;
