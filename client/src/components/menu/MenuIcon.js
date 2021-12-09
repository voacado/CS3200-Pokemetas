import React from 'react';
import useOutsideClicked from '../hooks/useOutsideClicked'
import {
    MenuDiv,
    Li,
    IconDiv,
} from './MenuIconStyle';


export default function MenuIcon(props) {
    const { ref, isComponentVisible, setIsComponentVisible } = useOutsideClicked(false);
    return (
        <MenuDiv ref={ref}>
        <Li>
            <IconDiv onClick={() => setIsComponentVisible(!isComponentVisible)}>
                {props.icon}
            </IconDiv>

            {isComponentVisible && props.children}
        </Li>
        </MenuDiv>
    );
}