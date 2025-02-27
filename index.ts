import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import minimist from 'minimist';
import { parse, HTMLElement } from 'node-html-parser';
import fetch from 'node-fetch';
import { createCanvas, loadImage, registerFont, CanvasRenderingContext2D } from 'canvas';
import sharp from 'sharp';

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

const sites: Record<string, SiteConfig> = {
    sauce: {
        baseUrl: 'http://localhost:4000',
        // baseUrl: 'https://sauce.gaya.pizza',
        selector: 'main article',
        background: '#C03319',
        logo: './assets/sauce-logo.svg',
    },
    danny: {
        // baseUrl: 'http://localhost:4000',
        baseUrl: 'https://www.dannyvankooten.com',
        selector: 'body article',
    },
    barry: {
        // baseUrl: 'http://localhost:4000',
        baseUrl: 'https://www.barrykooij.com',
        selector: 'body article',
    },
}

const args = minimist(process.argv.slice(2));

function formatTitle(title: string, maxWidth: number, ctx: CanvasRenderingContext2D): string {
    const words = title.split(' ');

    return words.reduce((acc, word) => {
        if (acc === '') {
            return word;
        }

        if (ctx.measureText(acc + ' ' + word).width > maxWidth) {
            const [beforeDash, ...splitOnDash] = word.split('-');

            if (splitOnDash.length > 0 && ctx.measureText(acc + ' ' + beforeDash + '-').width <= maxWidth) {
                return `${acc} ${beforeDash}-\n${splitOnDash.join('-')}`;
            }

            return `${acc}\n${word}`;
        }

        return `${acc} ${word}`;
    }, '');
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

    const formattedTitle = formatTitle(title || 'No title', maxTitleWidth, ctx);
    const lines = formattedTitle.split('\n');
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
    ctx.fillText(formattedTitle, titlePadding, top);

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

if (args.site && args.path && args.out) {
    (async () => {
        const buffer = await generateImageFromURL(sites[args.site], args.path);
        writeFileSync(
            args.out,
            buffer,
        );
    })();
}

export default generateImage;