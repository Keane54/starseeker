import { useEffect } from 'react';

function useHandleResize(callback: () => void) {
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                callback();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
}

export default useHandleResize;