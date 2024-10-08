import { useEffect } from 'react';

function useClickedOutside(ref: React.RefObject<HTMLElement>, callback: () => void) {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [ref]);
}

export default useClickedOutside;