import React, { useState } from 'react';
import {
    MenuDiv,
    Li,
    IconDiv,
} from './MenuIconStyle';


export default function MenuIcon(props) {
    const [open, setOpen] = useState(false);
    return (
        <MenuDiv>
        <Li>
            <IconDiv onClick={() => setOpen(!open)}>
                {props.icon}
            </IconDiv>

            {open && props.children}
        </Li>
        </MenuDiv>
    );
}