import React, {useRef} from "react";
import styled from "styled-components";

import X_Icon from "../img/icon/X-icon.svg";
/*
import LoadingIcon from "../img/input-verification/loading.svg";
import InvalidIcon from "../img/input-verification/invalid.svg";
import VerifiedIcon from "../img/input-verification/verified.svg";

import { rotate } from "../keyframes/keyframes"; */

const Input = styled.input`
  border: none;
  background: #F2F2F2;
  color: black;
  border-radius: 10px;
  padding: 0.8em;
  font-weight: bold;
  width: 100%;
  transition: 0.3s;

  &:hover {
    background: #aaaaaa;
  }
`;

const Wrapper = styled.div`
  padding: ${props => props.paddingWrapper ? props.paddingWrapper : '1.4em 0.1em'};
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  margin: ${(props) => (props.margin ? props.margin : "")};
`;

const Label = styled.label`
  position: absolute;
  left: 0;
  color: #909090;
  top: 0;
  transition: 0.3s;
  z-index: 0;

  ${Wrapper}:hover & {
    color: black;
  }

  ${Wrapper}:focus-within & {
    color: black;
  }
`;

const Comment = styled.span`
  position: absolute;
  left: 0;
  font-size: 14px;
  bottom: -0.5em;
  color: #a1a2a7;
`;

const DeleteDataFromInput = styled.button`
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: none;
  display: flex;
  background-color: white;
  background-image: url(${X_Icon});
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;

  &:hover{
    transform: scale(1em);
  }
`

function CustomInput({
  name,
  label,
  loading,
  handleChange,
  handleClick,
  comment,
  paddingWrapper,
  ...otherProps
}) {

  let observer = useRef()

  const handleClickDeleteFromInput = (event)=>{
    event.preventDefault()
    event.target.value=''
    handleClick(event)
    observer.current.focus()
  }

  return (
    <Wrapper paddingWrapper={paddingWrapper} margin={comment && "0 0 1.4em 0"}>
      {label ? <Label>{label}</Label> : ""}
      <Input name={name} ref={observer} onChange={handleChange} {...otherProps}></Input>
      {handleClick && <DeleteDataFromInput name={name} onClick={handleClickDeleteFromInput} />}
      {comment && <Comment>{comment}</Comment>}
    </Wrapper>
  );
}

export default CustomInput;
