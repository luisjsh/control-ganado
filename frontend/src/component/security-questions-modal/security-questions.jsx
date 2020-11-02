import React, { Component } from 'react'

import Modal from '../modal/modalComponent'
import CustomInput from '../custom-input/custom-input'
import './security-questions-styles.scss'
import CustomButton from '../custom-button/custom-button';

class SecurityQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
                 x: 0,
                 width: 0,
                 heigth: 0,
                 firstSecurityQuestion:'¿Cual es el apellido del mejor amigo de su infancia?',
                 firstSecurityQuestionAnswer: '',
                 secondSecurityQuestion:'¿Cual es la marca de su primer vehiculo?',
                 secondSecurityQuestionAnswer: ''

        }
        this.submit = this.submit.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }


    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }



//---------------- Carrousel ----------------------
goLeft = () =>{
    let move = 0
    
    if (this.state.width >= 600){
       move = 600;
    
    } else if ( this.state.width >= 400){
        move = 400;
    } else if ( this.state.width < 400){
        move = 300;
    }


    let x = this.state.x + move
    this.setState({x: x})
}


goRight = () =>{
    let move = 0
    
    if (this.state.width >= 600){
        move = 600;
     
     } else if ( this.state.width >= 400){
         move = 400;
     } else if ( this.state.width < 400){
         move = 300;
     }
    let x = this.state.x - move
    this.setState({x: x})

}
//----------------------------------------------------------------------------

//---------------- input-form ----------------------

formHandler( event ){
        let { name, value } = event.target
        this.setState({[name]: value})
}

//--------------- submit  ---------------

submit(event){
    event.preventDefault();
    this.props.onSubmit(this.state.firstSecurityQuestion, this.state.firstSecurityQuestionAnswer, this.state.secondSecurityQuestion, this.state.secondSecurityQuestionAnswer)
    this.props.handleClick()
}





    render() {
        return (
            <Modal handleClick={this.props.handleClick}>
            <div className='security-questions' >
                <div className="card">

                    <div className="input-section">
                        <div className='card-select'>
                           
                        <div className="select-input" style={{transform:'translateX('+this.state.x+'px)'}}>
                            <select name='firstSecurityQuestion' onChange={this.formHandler}>
                                <option value='¿Cual es el apellido del mejor amigo de su infancia?'>¿Cual es el apellido del mejor amigo de su infancia?</option>
                                <option value='¿Cual es el nombre de su primera mascota?'>¿Cual es el nombre de su primera mascota?</option>
                                <option value='¿Cual es el nombre de la ciudad donde nació?'>¿Cual es el nombre de la ciudad donde nació?</option>
                                <option value='¿Cual es su color favorito?'>¿Cual es su color favorito?</option>
                            </select>
                            <CustomInput name='firstSecurityQuestionAnswer' value={this.state.firstSecurityQuestionAnswer} onChange={this.formHandler}></CustomInput>
                            <CustomButton color='primary-blue' onClick={this.goRight}>Siguiente pregunta</CustomButton> 
                        </div>

                        <div className="select-input" style={{transform:'translateX('+this.state.x+'px)'}} >
                            <select name='secondSecurityQuestion' onChange={this.formHandler} >
                                <option value='¿Cual es la marca de su primer vehiculo?'>¿Cual es la marca de su primer vehiculo?</option>
                                <option value='¿Cual es el segundo nombre de su padre?'>¿Cual es el segundo nombre de su padre?</option>
                                <option value='¿Cual es la ciudad donde conocio a su esposa o esposo?'>¿Cual es la ciudad donde conocio a su esposa o esposo?</option>
                                <option value='¿Cual es el nombre de su artista preferido?'>¿Cual es el nombre de su artista preferido?</option>
                                <option value='¿Cual es su pelicula favorita?'>¿Cual es su pelicula favorita?</option>
                            </select>

                            <CustomInput name='secondSecurityQuestionAnswer' value={this.state.secondSecurityQuestionAnswer} onChange={this.formHandler}></CustomInput>
                            <div className="form"><CustomButton color='secundary-blue' onClick={this.goLeft} style={{width: '45%'}}>Pregunta Anterior</CustomButton> <CustomButton color='primary-blue' onClick={this.submit}>Guardar Informacion</CustomButton></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
        )
    }
}

export default SecurityQuestions
