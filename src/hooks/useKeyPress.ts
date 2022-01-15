import { useCallback, useEffect, useState } from 'react';

export function useKeyPress(key: string | string[]) {
    const [isDown, set] = useState(false);
    const keys = Array.isArray(key) ? key : [key];

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!isDown && keys.includes(event.key)) {
                set(true);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [...keys, isDown]
    );

    const handleKeyUp = useCallback(
        (event: KeyboardEvent) => {
            if (isDown && keys.includes(event.key)) {
                set(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [...keys, isDown]
    );

    const handleWindowBlur = useCallback(() => {
        set(false);
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('blur', handleWindowBlur);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleWindowBlur);
        };
    }, [handleKeyDown, handleKeyUp, handleWindowBlur]);

    return isDown;
}
