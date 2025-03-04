import { signal } from "@preact/signals";

export const imageSize = signal<'og' | 'twitter'>('og');