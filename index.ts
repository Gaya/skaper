import * as fs from "node:fs";

import minimist from 'minimist';
import { parse } from 'node-html-parser';
import fetch from 'node-fetch';
import {createCanvas, loadImage, registerFont} from 'canvas';
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
    }
}

const args = minimist(process.argv.slice(2));

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
                const imgBuffer = await (await fetch([config.baseUrl, firstImage.attrs.src].join(''))).arrayBuffer();
                const resized = await sharp(imgBuffer)
                    .resize(width, height)
                    .png()
                    .toBuffer();

                const img = await loadImage(resized);
                ctx.drawImage(img, 0, 0);
            }

            ctx.font = "72px JetBrainsMono";
            ctx.textAlign = "left";
            ctx.fillStyle = "#fff";

            ctx.fillText(title || 'No title', 46, 430);

            const buffer = canvas.toBuffer("image/jpeg");
            fs.writeFileSync("./.tmp/poster.jpg", buffer);
        });
}

generateImage(sites[args.site], args.path);