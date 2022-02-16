import {useFrame, useLoader} from '@react-three/fiber';
import React, {useEffect, useRef, useState} from 'react';
import {Euler, Mesh, RepeatWrapping, TextureLoader, Vector3} from 'three';
import background from '../assets/bg54.jpg';
import dirt from '../assets/dirt.png';
import {KeyRules, KeyStates, useKeyState} from 'use-key-state';
import {useKeyPress} from '../hooks/useKeyPress';
import {store} from '../redux/store';
import {RootData, rootSlice} from '../redux/reducers';
import {useSelector} from 'react-redux';

enum Direction {
    UP,
    DOWN,
    RIGHT,
    LEFT
}

const keyToDirection = {
    w: Direction.UP,
    s: Direction.DOWN,
    a: Direction.LEFT,
    d: Direction.RIGHT
};

const directionToVector = {
    [Direction.UP]: new Vector3(0, 1, 0),
    [Direction.DOWN]: new Vector3(0, -1, 0),
    [Direction.LEFT]: new Vector3(-1, 0, 0),
    [Direction.RIGHT]: new Vector3(1, 0, 0),
};

export function Scene() {
    const [colorMap, colorMap2] = useLoader(TextureLoader, [
        background,
        dirt
    ]);
    const [pos, setPos] = useState<Vector3>(new Vector3(0, 0, 0));
    const [rotate, setRotate] = useState(false);
    const [direction, setDirection] = useState<Direction | undefined>(undefined);
    // const paused = useSelector<RootData>(state => state.paused);
    const ref = useRef<Mesh>(null!);

    const keys = {
        w: useKeyPress('w'),
        a: useKeyPress('a'),
        s: useKeyPress('s'),
        d: useKeyPress('d')
    };

    const esc = useKeyPress('esc');

    useEffect(() => {
        for (let k of Object.keys(keys)) {
            const state = keys[k as 'w'];
            const dir = keyToDirection[k as 'w'];
            if (state) {
                setDirection(dir);
                return;
            }
        }
        setDirection(undefined);
    }, [keys]);

    // useEffect(() => {
    //     if (esc) {
    //         store.dispatch(rootSlice.actions.update({
    //             paused: !paused
    //         }))
    //     }
    // }, [esc, paused]);

    // const rotation = new Euler(0, 0, 0);
    // const [rotation, setRotation] = useState<Euler>(new Euler(0, 0, 0));

    useFrame(({clock, camera}, delta) => {
        // if (rotate) {
        //     ref.current.rotateX(delta * 100 * Math.PI / 180);
        //     // const r = ref!.current!.rotation;
        //     // r.set(r.x + delta * 1000 * Math.PI/180, r.y, r.z);
        // }

        if (direction !== undefined) {
            const {position, rotation} = ref.current;
            const vec = directionToVector[direction];
            // rotation.set(rotation.x + vec.x * delta * 10, rotation.y + vec.y * delta * 10, rotation.z + vec.z * delta * 10);
            position.set(position.x + vec.x * delta * 10, position.y + vec.y * delta * 10, position.z + vec.z * delta * 10);
            camera.position.setX(position.x);
            camera.position.setY(position.y);
        } else {
            // console.log(false);
        }
    });

    colorMap.wrapS = colorMap.wrapT = RepeatWrapping;
    colorMap.repeat.set(10, 10);

    return (
        <>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            <mesh
                position={[0, 0, -100]}
            >
                <planeGeometry args={[10000, 10000]}/>
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
