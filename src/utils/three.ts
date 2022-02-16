import {Plane, Texture, Vector2, Vector3} from 'three';
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

export function vec2vec3(v: Vector2): Vector3 {
    return new Vector3(v.x, v.y);
}

export function angleBetween(u: Vector2, v: Vector2): number {
    return signedAngleTo(vec2vec3(u), vec2vec3(v));
}

export function getNormal(u: Vector3, v: Vector3): Vector3 {
    return new Plane().setFromCoplanarPoints(new Vector3(), u, v).normal;
}

export function signedAngleTo(u: Vector3, v: Vector3): number {
    const angle = u.angleTo(v);
    const normal = getNormal(u, v);
    return normal.z * angle;
}
