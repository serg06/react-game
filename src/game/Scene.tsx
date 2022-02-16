import {useFrame, useLoader} from '@react-three/fiber';
import React, {useEffect, useRef, useState} from 'react';
import {Euler, Mesh, RepeatWrapping, Texture, TextureLoader, Vector2, Vector3} from 'three';
import background from '../assets/bg54.jpg';
import dirt from '../assets/dirt.png';
import {KeyRules, KeyStates, useKeyState} from 'use-key-state';
import {useKeyPress} from '../hooks/useKeyPress';
import {store} from '../redux/store';
import {RootData, rootSlice} from '../redux/reducers';
import {useSelector} from 'react-redux';
import {scaleTexture} from '../utils/three';

export function Scene() {
    const [colorMap, colorMap2] = useLoader<Texture, string[]>(TextureLoader, [
        background,
        dirt
    ]);

    const scale = scaleTexture(colorMap, [100_000, 100_000]);

    const [pos, setPos] = useState<Vector3>(new Vector3(0, 0, 0));
    const [rotate, setRotate] = useState(false);
    // const paused = useSelector<RootData>(state => state.paused);
    const ref = useRef<Mesh>(null!);

    // useEffect(() => {
    //     if (esc) {
    //         store.dispatch(rootSlice.actions.update({
    //             paused: !paused
    //         }))
    //     }
    // }, [esc, paused]);

    // const rotation = new Euler(0, 0, 0);
    // const [rotation, setRotation] = useState<Euler>(new Euler(0, 0, 0));

    useFrame(({clock, camera, mouse}, delta) => {
        const {position} = ref.current;
        mouse = mouse.length() === 0 ? new Vector2(1, 0) : mouse.normalize();
        position.set(position.x + mouse.x * delta * 200, position.y + mouse.y * delta * 200, position.z);
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
                onClick={() => setRotate(rotate_ => !rotate_)}
                ref={ref}
            >
                <circleGeometry args={[32, 32]}/>
                <meshStandardMaterial map={colorMap2}/>
            </mesh>
        </>
    );
}
