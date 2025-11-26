import { useEffect } from "react";
import ScrollReveal from "scrollreveal";


const ScrollWrapper = () => {
    useEffect(() => {
        ScrollReveal().reveal('.svg-parent', {
            distance: '5rem',
            duration: 1500,
            easing: 'ease-in-out',
            origin: 'bottom',
            delay: 100
        })
    }, []);
}

export default ScrollWrapper;