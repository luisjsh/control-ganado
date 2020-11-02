import React , { Component } from "react";
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";

import "./search-page-styles.scss";

import TreeIcon from './img/park.svg'
import Card from "../image-card/image-card";
import CustomButton from '../custom-button/custom-button'

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

    componentDidUpdate(){
        if( this.props.match.params.name !== this.state.value){
            this.setState({ value: this.props.match.params.name})
            this.handleUpdate(this.props.match.params.name)
        }
    }

    async handleUpdate(value){
        await fetch("http://localhost:4000/search/page/"+ value, {
            method: "GET",
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
          {this.state.result ? (
            <div className="cards-section">
              {this.state.result.response.map(
                ({ id, nombre, hierro, torosimagenes, fechanac, tientadia, tientaresultado, tientatentadopor,tientalugar}, index) => (
                    <Card
                    key={id}
                    hierro={hierro}
                    nombre={nombre}
                    animationDelay={index}
                    fechanac={fechanac.slice(2, 4)}
                    imagenes={torosimagenes}
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

const mapStatetoProps = ({user: {currentUserAdmin}})=>{
  return{
    currentUserAdmin
  }
}

export default connect (mapStatetoProps) (withRouter(SearchPage))
