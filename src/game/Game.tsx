import { Stats } from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import React from 'react';
import {Scene} from './Scene';

export function Game() {
    return (
        <Canvas style={{
            width: '100%',
            height: '100%'
        }} orthographic>
            <React.Suspense fallback={null}>
                <Scene/>
            </React.Suspense>
            <Stats/>
        </Canvas>
    );
}
