import React, {useState} from 'react'
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
  text-transform: capitalize;
  font-weight: bold;
  align-items: center;
`

export const HeaderWrapperBottom = styled.div`
  padding: 1em;
  text-align: center;
  font-weight: bold;
`

export const Hierro = styled.div`
  background-color: white;  
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
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

const BlurredBackground = styled.img`
  background-color: white;
  position: absolute; 
  background-size: 3000%;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  filter: grayscale(5) contrast(.3) brightness(.8);
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
  const [imageLoadError, setImageLoadError] = useState(false)

  if(imageLoadError) return <CardNoImage/>

  if(!imageLoadError) return(
    <Wrapper hovered={hovered}>
      <BlurredBackground 
        src={path} 
        onError={()=>setImageLoadError(true)} 
      />
      <Img src={`${path}`} 
      loading='lazy' 
      onError={()=>setImageLoadError(true)} 
      width='300' 
      height='300'/>
    </Wrapper>
  )
}