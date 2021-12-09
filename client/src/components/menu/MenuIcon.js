import React from 'react';
import useMenuOpenClose from '../../hooks/useMenuOpenClose'
import {
    MenuDiv,
    Li,
    IconDiv,
} from './MenuIconStyle';


export default function MenuIcon(props) {
    const { ref, open, setOpen } = useMenuOpenClose(false);
    return (
        <MenuDiv ref={ref}>
        <Li>
            <IconDiv onClick={() => setOpen(!open)}>
                {props.icon}
            </IconDiv>

            {open && props.children}
        </Li>
        </MenuDiv>
    );
}