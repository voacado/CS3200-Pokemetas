import React from 'react';
import {
    DropdownDiv,
    MenuItem,
    IconRight,
} from './DropdownMenuStyle';

export default function DropdownMenu() {

    function DropdownItem(props) {
        return (
            <MenuItem>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <IconRight>{props.rightIcon}</IconRight>
            </MenuItem>
        );
    }

    return (
        <DropdownDiv>
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem>My Teams</DropdownItem>
        </DropdownDiv>
    );
}