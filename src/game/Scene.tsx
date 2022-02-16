import {useFrame, useLoader} from '@react-three/fiber';
import React, {useRef} from 'react';
import {Mesh, RepeatWrapping, Texture, TextureLoader, Vector2} from 'three';
import background from '../assets/bg54.jpg';
import dirt from '../assets/dirt.png';
import {scaleTexture} from '../utils/three';
import {Player} from './player';

export function Scene() {
    const [colorMap, colorMap2] = useLoader<Texture, string[]>(TextureLoader, [
        background,
        dirt
    ]);

    const player = new Player();

    const scale = scaleTexture(colorMap, [100_000, 100_000]);
    const ref = useRef<Mesh>(null!);

    useFrame(({clock, camera, mouse}, delta) => {
        mouse = mouse.length() === 0 ? new Vector2(1, 0) : mouse.normalize();
        player.looking = mouse;
        player.update(delta);

        const {position} = ref.current;
        position.set(player.pos().x, player.pos().y, 0);
        camera.position.setX(position.x);
        camera.position.setY(position.y);
    });

    colorMap.wrapS = colorMap.wrapT = RepeatWrapping;
    colorMap.repeat.set(...scale.repeat);

    return (
        <>
            <ambientLight intensity={2.5}/>
            <mesh
                position={[0, 0, -10]}
            >
                <planeGeometry args={scale.dims}/>
                <meshStandardMaterial map={colorMap}/>
            </mesh>
            <mesh
                position={[0, 0, 0]}
                ref={ref}
            >
                <circleGeometry args={[32, 32]}/>
                <meshStandardMaterial map={colorMap2}/>
            </mesh>
        </>
    );
}
