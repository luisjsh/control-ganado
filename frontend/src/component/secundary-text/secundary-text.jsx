import React from 'react'
import styled from 'styled-components'

const SecundaryTitle = styled.h3`
  font-weight: bold;
  font-size: 1em;
  text-align: left;
`

const P = styled.p`
  display: flex;
  align-items: bottom;
  font-size: 1em;
  margin-left: 3px;
  font-weight: 400;
  text-transform: capitalize;

  img{
    width: 60px;
    height: 60px;
    margin-left: 5px;
    border-radius: 10px;
    border:1px solid grey;
  }

  `

function SecundaryText({children, title}){
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <SecundaryTitle>{title}</SecundaryTitle>
        <P>{children}</P>
      </div>
    )
  }

  export default SecundaryText