import React from 'react';
import {
    DropdownDiv,
    MenuItem,
    Icon,
    Triangle,
} from './DropdownMenuStyle';

/**
 * Backgroud for dropdown menu with a triangle divot.
 * @param props arguments passed by parent component 
 */
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

/**
 * The tabs that are within the dropdown menu.
 * @param props arguments passed by parent component 
 */
export function DropdownItem(props) {
    return (
        <MenuItem href={props.link}>
            <Icon>{props.leftIcon}</Icon>
            {props.children}
        </MenuItem>
    );
}