import * as fs from "node:fs";

import minimist from 'minimist';
import { parse } from 'node-html-parser';
import fetch from 'node-fetch';
import { createCanvas } from 'canvas';

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
        .then((root) => {
            const body = root.querySelector(config.selector || 'body');

            if (!body) {
                throw new Error(`Could not find body on '${config.selector}'`);
            }

            const title = body.querySelector('h1')?.textContent;
            const firstImage = body.querySelector('img');

            console.log(title, firstImage?.attrs.src);
            const width = 1200;
            const height = 630;

            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, width, height);

            const buffer = canvas.toBuffer("image/jpeg");
            fs.writeFileSync("./.tmp/poster.jpg", buffer);
        });
}

generateImage(sites[args.site], args.path);