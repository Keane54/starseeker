import { useEffect } from 'react';

function usePathChange(path: string, callback: () => void) {
    useEffect(() => {
        callback();
    }, [path]);
}

export default usePathChange;