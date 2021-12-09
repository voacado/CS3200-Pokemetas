import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for opening and closing a component. Will close component if there is a mouse click 
 * outside it.
 * @param {Boolean} initState if the component is open or closed at initiation 
 */
export default function useMenuOpenClose(initState) {
    const [open, setOpen] = useState(initState);
    const ref = useRef(null);

    // if a ref exists and its not referencing the component, close it.
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
        }
    };

    // adds event listener to document
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, open, setOpen };
}