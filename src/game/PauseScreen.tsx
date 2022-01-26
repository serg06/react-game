import {useEffect} from 'react';
import {useFrame, useThree} from '@react-three/fiber';
import {useCamera} from '@react-three/drei';

export function PauseScreen() {
    // configure font geometry
    const textOptions = {
        size: 5,
        height: 1
    };

    useThree(({camera}) => {

    });

    return <>
        <mesh>
            <textGeometry attach='geometry' args={['three.js', textOptions]} />
            <meshStandardMaterial attach='material' />
        </mesh>
    </>;
}
