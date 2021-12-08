import React from 'react';
import {
    DropdownDiv,
    MenuItem,
} from './DropdownMenuStyle';

export default function DropdownMenu(props) {
    return (
        <DropdownDiv>
            {props.children}
        </DropdownDiv>
    );
}

export function DropdownItem(props) {
    return (
        <MenuItem href={props.link}>
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
        </MenuItem>
    );
}