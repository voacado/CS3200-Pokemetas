import React from 'react';
import {
    DropdownDiv,
    MenuItem,
    Icon,
    Triangle,
} from './DropdownMenuStyle';

export default function DropdownMenu(props) {
    return (
        <div>
        <Triangle></Triangle>
        <DropdownDiv>
            {props.children}
        </DropdownDiv>
        </div>
    );
}

export function DropdownItem(props) {
    return (
        <MenuItem href={props.link}>
            <Icon>{props.leftIcon}</Icon>
            {props.children}
        </MenuItem>
    );
}