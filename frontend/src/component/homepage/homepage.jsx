import React, {useState, useRef, useCallback} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import useSearchWithPagination from '../../functions/paginator'

import "./style.scss";

import HouseIcon from './img/house.svg'
import Card from "../image-card/image-card";
import CustomButton from '../custom-button/custom-button'

function HomePage ({history, setBadNotification, currentUserAdmin}) {
  const [pageNumber, setPageNumber] = useState(1)
  const {loading, error, items, hasMore} = useSearchWithPagination('', pageNumber)

  const observer = useRef()

  const lastItemReferred = useCallback(node => {
    if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1)
        }
      })
    if(node) observer.current.observe(node)
  }, [loading, hasMore])

  if(error) setBadNotification('Error de conexión')

  if (items.length === 0 && !hasMore) return (
    <div className="HomePage">
      <div className="loader">
        <div className='no-cards'> 
          <h3>Esto se encuentra algo vacío...</h3>
          <img src={HouseIcon} alt='empty house'/>
          {currentUserAdmin && 
          <CustomButton 
            onClick={()=>history.push('/add-res')}
            color='primary-blue'
            >Agregar Res</CustomButton>}
        </div>
      </div>
    </div>
  )  
  
  return (
    <div className="HomePage" >
      <div className='loader'>
        <div className="card-section">
        {
          items.map( ({ id, nombre, hierro, sexo, hierrocodigo, torosimagenes, ganaderia, fechanac, tientadia, tientaresultado, tientatentadopor,tientalugar}, index) => {
            if (items.length === index + 1) {
              return <div
              ref={lastItemReferred}
              key={id}
              >
                <Card
                hierro={hierro}
                nombre={nombre}
                sexo={sexo}
                hierrocodigo={hierrocodigo}
                animationDelay={index}
                fechanac={fechanac.slice(8, 10)}
                imagenes={torosimagenes}
                tientaDia={tientadia}
                ganaderia={ganaderia}
                tientaResultado={tientaresultado}
                tientaTentadoPor={tientatentadopor}
                tientaLugar={tientalugar}
                handleClick={() => {
                  history.push('/item/'+ id )
                }}/>

                </div>
                
            } else {
              return <div
              key={id}
              >
                  <Card
                hierro={hierro}
                nombre={nombre}
                sexo={sexo}
                hierrocodigo={hierrocodigo}
                animationDelay={index}
                fechanac={fechanac.slice(8, 10)}
                ganaderia={ganaderia}
                imagenes={torosimagenes}
                tientaDia={tientadia}
                tientaResultado={tientaresultado}
                tientaTentadoPor={tientatentadopor}
                tientaLugar={tientalugar}
                handleClick={() => {
                  history.push('/item/'+ id )
                }} />

              </div>
            }})
        }
        </div>
      </div>
    </div>
  );
}


const mapStatetoProps = ({
  user: {
    currentUser,
    currentToken,
    currentUserArray,
    currentUserAdmin,
    currentUserImagePath,
  },
}) => {
  return {
    currentUser,
    currentToken,
    currentUserArray,
    currentUserAdmin,
    currentUserImagePath,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  setBadNotification: (message) =>dispatch({type:'SET_BAD_NOTIFICATION', payload: message }),
  admin: () => dispatch({ type: "ADMIN" }),
  setItem: (itemData) =>
    dispatch({ type: "SET_CURRENT_ITEM", payload: itemData }),
});

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withRouter(HomePage));
