import React from 'react';
import { ButtonDiv, PopupDiv, IconDiv, Title } from './PopupStyle';
import useMenuOpenClose from '../../hooks/useMenuOpenClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Popup(props) {
    const { ref, open, setOpen } = useMenuOpenClose(false);
    const navigate = useNavigate();
    return (
        <div ref={ref}>
        <ButtonDiv onClick={() => setOpen(!open)}>{props.text}</ButtonDiv>
        {open && 
            <PopupDiv>
                <IconDiv>
                    <FontAwesomeIcon icon={faTimes} onClick={() => setOpen(false)}/>
                </IconDiv>
                <Title>{props.title}</Title>
                <ButtonDiv onClick={props.onClickYes}>{props.text1}</ButtonDiv>
                <ButtonDiv onClick={() => setOpen(false)}>{props.text2}</ButtonDiv>
            </PopupDiv>
        }
        </div>
    )
}