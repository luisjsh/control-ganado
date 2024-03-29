import React , { Component } from "react";
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";

import "./search-page-styles.scss";

import TreeIcon from './img/park.svg'
import Card from "../image-card/image-card";
import CustomButton from '../custom-button/custom-button'
import SecundaryText from '../secundary-text/secundary-text'

class SearchPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value : this.props.match.params.name,
            result: false        
        }
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    componentDidMount(){
        this.handleUpdate(this.state.value)
    }

    componentDidUpdate(prevProps){
        if( this.props.match.params.name !== prevProps.match.params.name){
            this.setState({ value: this.props.match.params.name})
            this.handleUpdate(this.props.match.params.name)
        }
    }

    async handleUpdate(value){
        await fetch("http://localhost:4000/search/page/"+ value.toLowerCase(), {
            method: "GET",
            headers:{
              'Content-type' :'application/json',
              'x-access-token' : this.props.currentToken
          }
          }).then(async (response) =>
            this.setState({ result: await response.json() })
          );
    }

    render() {
        return (
            <div
        className="HomePage"
        style={
          this.state.items ? { overflow: "visible" } : { overflow: "hidden" }
        }
      >
        <div className="loader">
          <SecundaryText title='Resultado de la busqueda para'>{this.state.value}</SecundaryText>
          {this.state.result ? (
            <div className="cards-section">
              {this.state.result.response.map(
                ({ id, nombre, hierro, sexo, torosimagenes, hierrocodigo, ganaderia, tientadia, tientaresultado, tientatentadopor,tientalugar}, index) => (
                    <Card
                    key={id}
                    hierro={hierro}
                    nombre={nombre}
                    sexo={sexo}
                    animationDelay={index}
                    hierrocodigo={hierrocodigo}
                    imagenes={torosimagenes}
                    ganaderia={ganaderia}
                    tientaDia={tientadia}
                    tientaResultado={tientaresultado}
                    tientaTentadoPor={tientatentadopor}
                    tientaLugar={tientalugar}
                    handleClick={() => {
                        this.props.history.push('/item/'+ id )
                    }}
                  />
                )
              )}

    
            </div>
          ) : (
            <div className='no-cards'> 
              <h3>Esto se encuentra algo vacío...</h3>
              <img src={TreeIcon} alt='empty house'/>
              {this.props.currentUserAdmin && 
              <CustomButton 
                onClick={()=>this.props.history.push('/add-res')}
                color='primary-blue'
                >Agregar Res</CustomButton>}
            </div>
          )}
        </div>
      </div>
        )
    }
}

const mapStatetoProps = ({user: {currentUserAdmin, currentToken}})=>{
  return{
    currentUserAdmin, currentToken
  }
}

export default connect (mapStatetoProps) (withRouter(SearchPage))
