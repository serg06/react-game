import {Texture} from 'three';
import {zip} from 'lodash-es';

export interface ScaledTexture {
    repeat: [number, number],
    dims: [number, number]
}

export function scaleTexture(texture: Texture, min_dims: [number, number]): ScaledTexture {
    const dims = [texture.image.width, texture.image.height];
    const scale = Math.max(...zip(min_dims, dims).map(([d1, d2]) => d1! / d2), 1);
    return {
        repeat: [scale, scale],
        dims: [
            dims[0] * scale, dims[1] * scale
        ]
    }
}
