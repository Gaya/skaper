declare var hexo: any;

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { existsSync, writeFileSync } from "hexo-fs";

import { generateImage, parseHTML } from 'skaper';

async function createImages(this: any) {
  const hexo = this;
  const posts = hexo.locals.get('posts');

  console.info('Generating OG images');

  return Promise.all(posts.data.map((p: any) => new Promise((resolve) => {
    const path = join(hexo.base_dir, 'source', '_posts', p.slug, 'og-poster.jpg');

    if (!existsSync(path)) {
      console.info('Creating OG image for', path);

      const logo = join(hexo.base_dir, hexo.config.skaper?.logo);

            return generateImage(
                parseHTML(`<div id="root">${p.content}</div>`),
                {
                    baseUrl: hexo.config.url,
                    selector: '#root',
                    background: '#C03319',
                    logo,
                    getTitle: () => p.title,
                    resolveImage: (src: string): Promise<ArrayBuffer> => readFile(join('source/_posts', src)),
                },
            ).then((image) => {
                writeFileSync(
                    path,
                    image,
                );
            });
        }

    // all is well
    resolve(true);
  })));
}

if (hexo) {
  hexo.extend.filter.register('before_generate', createImages);
}
