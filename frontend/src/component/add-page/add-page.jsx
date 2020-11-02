import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {debounce} from 'lodash'

import "./add-page-styles.scss";

import validator from '../../functions/validator' 

import LidiaPart from './steps/lidia-step'
import MainInfo from './steps/mainInfo-step'

class AddPage extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 'first',
      hierroInformation: false,
      pelajeInformation: false,

      motherArray: false,
      fatherArray: false
    };

    
   /* this.GeneticRange = this.GeneticRange.bind(this);*/
    this.submitToDb = this.submitToDb.bind(this);
    this.updateState = this.updateState.bind(this);
    this.searchParents = this.searchParents.bind(this);
    this.updateClickedParent = this.updateClickedParent.bind(this);
  }

  async componentDidMount() {
    if(this.props.currentUser === 'null' || this.props.currentUser === null) 
    return this.props.history.push('/')
    
    await fetch("/configuration/gethierro", {
      method: "GET",
      headers: {
        "x-access-token": this.props.currentToken,
      },
    })
      .then(async (response) => {
        this.setState({ hierroInformation: await response.json() });
      })
      .catch((e) => this.props.setBadNotification("Error de conexion al intentar obtener la informacion de los hierros"));

      await fetch("/configuration/getpelaje", {
      method: "GET",
      headers: {
        "x-access-token": this.props.currentToken,
      },
    })
      .then(async (response) => {
        this.setState({ pelajeInformation: await response.json() });
      })
      .catch((e) => this.props.setBadNotification("Error de conexion al intentar obtener la información de los pelajes"));

      /*await fetch("/configuration/logros", {
      method: "GET",
      headers: {
        "x-access-token": this.props.currentToken,
      },
    })
      .then(async (response) => {
        this.setState({ logrosInformation: await response.json() });
      })
      .catch((e) => this.props.setBadNotification("error de conexion")); */
  }
   
  searchParents = debounce ( async ( name, value) => {
    let parent = " ";
    if (name.search("mother") === 0) {
      parent = "Hembra";
      let formData = new FormData();
      formData.append("name", value);
      formData.append("sex", parent);
      
      await fetch("/item/searchforParent", {
        method: "POST",
        headers: {
          "x-access-token": this.props.currentToken,
        },
        body: formData,
      }).then(async (response) => {
        let { parentsArray } = await response.json();
        this.setState({ motherArray: parentsArray });
      }).catch( e =>  
        this.props.this.props.setBadNotification('Error de conexion')
      );
      
    } else if (name.search("father") === 0) {
      parent = "Macho";
      
      let formData = new FormData();
      formData.append("name", value);
      formData.append("sex", parent);
      
      await fetch("/item/searchforParent", {
        method: "POST",
        headers: {
          "x-access-token": this.props.currentToken,
        },
        body: formData,
      }).then(async (response) => {
        let { parentsArray } = await response.json();
        this.setState({ fatherArray: parentsArray });
      }).catch( e =>  
        this.props.setBadNotification('error de conexion')
        )}
      }, 300)
      

  updateState(stepName, stepData){
    this.setState({
      [stepName]:stepData
    })
  }
      
  updateClickedParent(parent, parentData){
    this.setState({
      [parent]:parentData
    })
  }

  async submitToDb(){
    let {
      hierro,
      hierroDropdownSelected,
      nombre,
      pelaje,
      padreId,
      madreId,
      files,
      sexo,
      encaste,
      tatuaje,
      fechaNac
    } = this.state.firstStep

    let formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("hierro", hierroDropdownSelected);
    formData.append("hierrocodigo", hierro);
    formData.append("tatuaje", tatuaje);
    formData.append("encaste", encaste);
    formData.append("pelaje", pelaje);
    formData.append("sexo", sexo);
    formData.append("fechaNac", fechaNac);
    //formData.append("logros", logros);
    formData.append("madreId", madreId);
    formData.append("padreId", padreId);
    formData.append('tientaDia', this.state.secondStep.tientaDate);
    formData.append('tientaResultado', this.state.secondStep.result);
    formData.append('tientaTentadoPor', this.state.secondStep.temptedBy);
    formData.append('tientaLugar', this.state.secondStep.place);
    formData.append('tientaCapa', this.state.secondStep.withCape);
    formData.append('tientaCaballo', this.state.secondStep.withHorse);
    formData.append('tientaMuleta', this.state.secondStep.withCrutch);

    if (files.length > 0){
      for (let i = 0; i < [...files].length; i++) {
        formData.append("image", files[i].item);
      }
    }

    try {
          await fetch("/item/add", {
            method: "POST",
            headers: {
              "x-access-token": this.props.currentToken,
            },
            body: formData,
          }).then( async response =>{
            let {message} = await response.json()

            switch(message){

              case 'succeeded':
                this.props.setGoodNotification('Agregado exitosamente')
                this.props.history.push('/')
                break;

              case 'problem db':
                validator(message, this.props.history)
                break;

              case 'problem pelaje':
                this.props.setBadNotification('El pelaje agregado es incorrecto')
                this.setState({step: 'first'})
                break;

            default:
              return ''
            }
          })
    } catch(e){
      this.props.setBadNotification('Error de conexión')
    }
  }

  render() {
    if (this.state.step === 'first') return (
      <MainInfo 
        hierroInformation={this.state.hierroInformation}
        pelajeInformation={this.state.pelajeInformation}
        motherArray={this.state.motherArray}
        fatherArray={this.state.fatherArray}
        handleClick={()=>this.setState({step: 'second'})}
        searchParents={this.searchParents}
        updateClickedParent={this.updateClickedParent}
        updateState={this.updateState}
      />
    );
    
    if (this.state.step === 'second') return (
      <LidiaPart
        updateState={this.updateState}
        handleClickConfirmation={this.submitToDb}
        goBack={
          ()=>this.setState({step: 'first'})
        }
      />
    )

  }
}

const mapStatetoProps = ({
  user: { currentUser, currentUserImagePath, currentToken },
}) => {
  return {
    currentUser,
    currentUserImagePath,
    currentToken,
  };
};

const mapDispatchtoProps = (dispatch)=>({
  setBadNotification: (message) =>dispatch({type:'SET_BAD_NOTIFICATION', payload: message }),
  setGoodNotification: (message) =>dispatch({type:'SET_GOOD_NOTIFICATION', payload: message })
})

export default connect(mapStatetoProps, mapDispatchtoProps)(withRouter(AddPage));