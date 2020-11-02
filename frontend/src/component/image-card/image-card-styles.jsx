import React from 'react'
import styled, {keyframes} from 'styled-components'

import NoImageIcon from './IMG/no-image.svg'

export const Appear = keyframes`
  0%{
    transform: translateY(30px);
    opacity: 0;
  }

  100%{
    transform: translateY(0);
    opacity: 1;
  }
`

export const Card = styled.div`
  background: #F2F2F2;
  border-radius: 10px;
  width: 300px;
  height: 400px;
  opacity: 0;
  display: grid;
  box-shadow: 0px 4px 4px 0 rgba(0,0,0,0.2);
  transition: .3s;
  grid-template-areas: ${props => props.hovered? `
    "header"
    "section"
  ` : `
    "header"
    "header"
  `};
  animation: ${Appear} ease 1s .${props => props.animationDelay ? props.animationDelay : ''}0s forwards;
  cursor: pointer;

  &:hover{
    transform: translateY(-10px);
    background: #0E8FFF;
    color: white;
  }
`

export const CardHeader = styled.header`
  height: ${props => props.hovered ? '300px' : '50px'};
  padding: .4em;
  grid-area: header;
  transition: .3s;
  `
  
export const HeaderWrapper = styled.div`
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-items: center;
  font-weight: bold;
  align-items: center;
`

export const HeaderWrapperBottom = styled.div`
  padding: 1em;
  text-align: center;
  font-weight: bold;
`

export const Hierro = styled.div`
  width: 30px;
  height: 30px;
  background-size: cover;
  border-radius: 100% ;
`


export const CardSection = styled.section`
  padding: .4em;
`

export const CardNoImage = styled.div`
  height: ${props => props.hovered ? '0' : '320px'};
  border-radius: 10px;
  background: url(${NoImageIcon}) no-repeat;
  background-color: white;
  background-position: center;
  background-size: 60%;
  transition: .3s;
`

export const Span = styled.span`
  text-transform: full-width;
  height: 99%;
  text-align: center;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Wrapper = styled.div`
  position: relative;
  height: ${props => props.hovered ? '0' : '320px'};
  border-radius: 10px;  
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s;
`

const BlurredBackground = styled.div`
  background: url(http://localhost:4000${props => props.path ? props.path : ''}) no-repeat;
  background-size: 10000%;
  position: absolute; 
  width: 100%;
  height: 100%;
  border-radius: 10px;
  filter: contrast(0.5);
  transition: .3s;
  `
  
  const Img = styled.img`
  height: ${props => props.hovered ? '0' : 'auto'};
  max-width: 93%;
  max-height: 95%;
  border-radius: 10px;
  transition: .3s;
  z-index: 1;
`


export const CardImage = ({path, hovered})=>{
  return(
    <Wrapper hovered={hovered}>
      <BlurredBackground path={path} />
      <Img src={`http://localhost:4000${path}`} loading='lazy'/>
    </Wrapper>
  )
}