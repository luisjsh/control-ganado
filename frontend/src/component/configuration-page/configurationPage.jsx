import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'

import "./configurationPage-styles.scss";

import ConfirmationCard from '../confirmation-card/confirmation-card'
import CustomInput from "../custom-input/custom-input";
import CustomButton from "../custom-button/custom-button";

class configurationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmation: false,
      url: false,
      pelaje: null,
      destroyPelajeId: false,
      pelajeCode: "",
      hierroCode: "",
    };
    this.getPelajes = this.getPelajes.bind(this)
    this.handleFile = this.handleFile.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.submit = this.submit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeConfirmation = this.changeConfirmation.bind(this)
  }

  async componentDidMount() {
    this.getPelajes()
  }

  async getPelajes(){
    await fetch("configuration/getpelaje", {
      method: "GET",
      headers: {
        "x-access-token": this.props.currentToken,
      },
    })
      .then(async (response) => {
        this.setState({ pelaje: await response.json() });
      })
      .catch((e) => this.props.setBadNotification("Error de conexión"));
  }
  
  formHandler(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFile(event) {
    if (event.target.files[0] !== undefined) {
      let url = URL.createObjectURL(event.target.files[0]);
      this.setState({ url: url, file: event.target.files[0] });
    }
  }


  async submit(event) {
    let {name} = event.target;

    if (name === "pelaje") {
      if (this.state.pelajeCode.length > 3) {
        let formData = new FormData();
        formData.append("pelaje", this.state.pelajeCode);

        await fetch("configuration/pelajes", {
          method: "POST",
          headers: {
            "x-access-token": this.props.currentToken,
          },
          body: formData,
        })
          .then(async (response) => {
            this.setState({ pelaje: await response.json() });
          })
          .catch((e) => this.props.setBadNotification("Error de conexión"));
      }
    } else if (name === "hierro") {
      if (this.state.hierroCode.length > 1 && this.state.url) {
        let formData = new FormData();
        formData.append("hierroCode", this.state.hierroCode);
        formData.append("image", this.state.file);
        await fetch("configuration/hierros", {
          method: "POST",
          headers: {
            "x-access-token": this.props.currentToken,
          },
          body: formData,
        }).then((response) => this.props.history.push("/"));
      }
    }
  }


  async handleClick (){
    await fetch("configuration/destroy/pelaje/"+this.state.destroyPelajeId, {
      method: "GET",
      headers: {
        "x-access-token": this.props.currentToken,
      },
    })
      .then(async (response) => {
        let {message} = await response.json()
        
        if(message === 'succesfully'){
          this.props.setGoodNotification('Eliminado exitosamente')
          this.getPelajes()
          this.changeConfirmation()
        }

        if(message === 'no entry'){
          this.props.setBadNotification('El pelaje introducido no se encuentra en la base de datos')
          this.changeConfirmation()
        }
      })
      .catch((e) => this.props.setBadNotification("Error de conexion"));
  }

  changeConfirmation = ()=>{
    this.setState({confirmation: !this.state.confirmation})
  }

  render() {
    return (
      <div className="configuration-page">
      {this.state.confirmation && 
        <ConfirmationCard 
          handleClick={this.changeConfirmation} 
          handleSubmit={this.handleClick}/>
          }
        <div className="table">
          <div className="add-section">
            <div className="inputfile-section">
              <CustomInput
                name="hierroCode"
                value={this.state.hierroCode}
                handleChange={this.formHandler}
                handleClick={this.formHandler}
                label="Introduzca el codigo del Hierro"
              />
              <label
                htmlFor="file"
                className="input-file"
                style={{
                  width: "100%",
                  background: this.state.url
                    ? "url(" +
                      this.state.url +
                      ") center center / 100% no-repeat"
                    : "",
                  border: "1px solid #DEDEDE",
                  borderRadius: "4px",
                  height: "60%",
                }}
              ></label>
              <input type="file" id="file" onChange={this.handleFile} />
              <CustomButton
                name="hierro"
                onClick={this.submit}
                color="primary-blue"
              >
                Agregar
              </CustomButton>
            </div>
            <div className="items">
              <CustomInput
                label="Introduzca el nombre del pelaje"
                name="pelajeCode"
                value={this.state.pelajeCode}
                onChange={this.formHandler}
                handleClick={this.formHandler}
              />
              <div className="pelajes-db">
                {
                this.state.pelaje != null
                  && this.state.pelaje.response.map(({ id, nombre }) => (
                      <span 
                        key={id} 
                        value={id} 
                        title={`Eliminar ${nombre}`}
                        onClick={
                          ()=>this.setState({confirmation: !this.state.confirmation, destroyPelajeId: id})
                        }>{nombre}</span>
                    ))
                }
              </div>
              <CustomButton
                name="pelaje"
                onClick={this.submit}
                color="primary-blue"
              >
                Agregar
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    );
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

const mapDispatchtoProps = (dispatch) =>(
  {
    setGoodNotification: (message)=>{dispatch({type:'SET_GOOD_NOTIFICATION', payload: message})},
    setBadNotification: (message)=>{dispatch({type:'SET_BAD_NOTIFICATION', payload: message})}
  }
)

export default connect(mapStatetoProps, mapDispatchtoProps)(withRouter(configurationPage));