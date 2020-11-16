import React from 'react';
import styled from 'styled-components'

import Cancel from '../img/icon/cancel-secundary.svg'
import CancelHovered from '../img/icon/cancel-primary.svg'

const Wrapper = styled.div`
    position: absolute;
    top: 1em;
    right: 1em;
    display: flex;
    align-items:center;
`

const Roundbutton = styled.div`
    border: none;
    background: url(${Cancel}) no-repeat;
    background-position: center;
    background-size: 60%;
    width: 3em;
    height: 3em;
    border-radius: 100%;    
    cursor: pointer; 
    transition: .3s;

    &:hover, &:focus{
        background: url(${CancelHovered}) no-repeat; 
        background-position: center;
        background-size: 60%;
        background-color:  #E4E4E4;
    }
`

const Label = styled.label`
    display: none;
    padding: .5em;
    color: #FF6B00;
    font-weight: bold;
    border-radius:.3em;
    margin-right: 3px;
    transition: .3s;

    ${Wrapper}:hover &, ${Wrapper}:focus-within &{
        display: block;
    }
`

function RoundButton({handleClick}) {
    return (
        <Wrapper>
        <Label>Salir</Label>
        <Roundbutton onClick={handleClick} tabIndex={0}/>
        </Wrapper>
    )
}

export default RoundButton;
