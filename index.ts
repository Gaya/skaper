import * as fs from "node:fs";

import minimist from 'minimist';
import { parse } from 'node-html-parser';
import fetch from 'node-fetch';
import { createCanvas, loadImage, registerFont, CanvasRenderingContext2D } from 'canvas';
import sharp from 'sharp';

registerFont('./JetBrainsMono-Medium.ttf', { family: 'JetBrainsMono' })

interface SiteConfig {
    baseUrl: string;
    selector?: string;
}

const sites: Record<string, SiteConfig> = {
    sauce: {
        // baseUrl: 'http://localhost:4000',
        baseUrl: 'https://sauce.gaya.pizza',
        selector: 'main article',
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

function generateImage(config: SiteConfig, path: string) {
    const url = [config.baseUrl, path].join('/');

    console.info(`Fetching data from ${url}`);

    fetch(url)
        .then((res) => res.text())
        .then(parse)
        .then(async (root) => {
            const body = root.querySelector(config.selector || 'body');

            if (!body) {
                throw new Error(`Could not find body on '${config.selector}'`);
            }

            const title = body.querySelector('h1')?.textContent;
            const firstImage = body.querySelector('img');

            const width = 1200;
            const height = 630;

            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, width, height);

            if (firstImage) {
                console.info('Fetching first image');
                const imgUrl = firstImage.attrs.src.startsWith('http')
                    ? firstImage.attrs.src
                    : [config.baseUrl, firstImage.attrs.src].join('');
                const imgBuffer = await (await fetch(imgUrl)).arrayBuffer();

                console.info('Resizing image');
                const resized = await sharp(imgBuffer)
                    .resize(width, height)
                    .png()
                    .toBuffer();

                console.info('Drawing image');
                const img = await loadImage(resized);
                ctx.drawImage(img, 0, 0);
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
            fs.writeFileSync(
                "./.tmp/poster.jpg",
                await sharp(buffer)
                    .jpeg({ mozjpeg: true })
                    .toBuffer(),
            );
        });
}

generateImage(sites[args.site], args.path);