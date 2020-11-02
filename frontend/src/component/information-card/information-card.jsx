import React, { Component } from 'react'
import { connect } from 'react-redux' 

import './information-card-styles.scss'

import ConfirmationCard from '../confirmation-card/confirmation-card'
import SecundaryText from '../secundary-text/secundary-text'
import DropdownSelect from '../dropdown-select/dropdown-select'
import DropdownInput from '../dropdown-with-input-text/dropdown-with-input'
import CustomInput from '../custom-input/custom-input'
import CustomButton from '../custom-button/custom-button'

class informationCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
                name: '',
                encaste: '',
                tatuaje: '',
                fechanac: {
                    day: '',
                    month: '',
                    year: ''
                },
                //goal: '',
                pelaje: '',
                tientadia: {
                    day: '',
                    month: '',
                    year: ''
                },
                tientaresultado: '',
                tientatentadopor: '',
                tientalugar: '',
                tientacaballo: '',
                tientacapa: '',
                tientamuleta: '',

                confirmation: false,

                currentItemArray: false,
                pelajeInformation: false
    }

        this.pelajeSelected = this.pelajeSelected.bind(this);
        this.handleUpdateandMount = this.handleUpdateandMount.bind(this)
        this.formHandler = this.formHandler.bind(this);
        this.applyUpdateEdit = this.applyUpdateEdit.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTientaDay = this.handleTientaDay.bind(this)
    }

    async componentDidMount(){
        let {id} = this.props
        this.handleUpdateandMount(id)
    }

    async componentDidUpdate(prevProps){     
      if(this.props.id !== this.state.id){
        this.setState({id: this.props.id})
        this.handleUpdateandMount(this.props.id)
      } 
      if(this.props.edit && !this.state.pelajeInformation){
        await fetch("/configuration/getpelaje", {
            method: "GET",
            headers: {
              "x-access-token": this.props.currentToken,
            },
          })
            .then(async (response) => {
              this.setState({ pelajeInformation: await response.json() });
            })
            .catch((e) => this.props.setBadNotification("Error de Conexión"));
      }
      if(prevProps.edit !== this.props.edit && !this.props.edit) this.handleUpdateandMount(this.props.id)
    }

    async handleUpdateandMount(id){
        await fetch('/item/search/profile/' + id)
        .then( async responseArray => {
            let { response } = await responseArray.json()
            let fechaNac = response.fechanac.split('-')
            let tientaDia = response.tientadia.split('-')
            response && 
                this.setState({
                    id: id , 
                    currentItemArray: response , 
                    name: response.nombre, 
                    pelaje: response.pelajes.nombre,
                    fechanac: {
                        day: fechaNac[2],
                        month: fechaNac[1],
                        year: fechaNac[0]
                    },
                    tientadia: {
                        day: tientaDia[2],
                        month: tientaDia[1],
                        year: tientaDia[0]
                    },
                    tientatentadopor: response.tientatentadopor,
                    tientaresultado: response.tientaresultado,
                    tientalugar: response.tientalugar,
                    tientacaballo: response.tientacaballo,
                    tientacapa: response.tientacapa,
                    tientamuleta: response.tientamuleta
                })
        })
    }

    formHandler(event) {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleDate(event){
        let { name, value } = event.target
        this.setState({
            fechanac: {
                ...this.state.fechanac,
                [name]: value
            }
        })
    }
    
    handleTientaDay(event){
        let { name, value } = event.target
        this.setState({
            tientadia: {
                ...this.state.tientadia,
                [name]: value
            }
        })
    }

    async applyUpdateEdit(event) {
        event.preventDefault();
        let formData = new FormData()

        formData.append('id' , this.props.currentItemArray.id)
        formData.append('nombre' , this.state.name)
        formData.append('pelaje' , this.state.pelaje )
        formData.append('fechaNac' , `${this.state.fechanac.year}-${this.state.fechanac.month}-${this.state.fechanac.day}`)
        //formData.append('logro' , this.state.goal)
        formData.append('tatuaje' , this.state.tatuaje)
        formData.append('encaste' , this.state.encaste)
        formData.append('tientaDia' , `${this.state.tientadia.year}-${this.state.tientadia.month}-${this.state.tientadia.day}`)
        formData.append('tientaTentadoPor' , this.state.tientatentadopor)
        formData.append('tientaLugar' , this.state.tientalugar)
        formData.append('tientaCaballo' , this.state.tientacaballo)
        formData.append('tientaCapa' , this.state.tientacapa)
        formData.append('tientaMuleta' , this.state.tientamuleta)
        try{
            await fetch('/item/update',{
            method: 'POST',
            headers:{
                'x-access-token' : this.props.currentToken
            },
            body: formData
                }).then( async responseArray => {
                    let {response} = await responseArray.json()
                    let fechaNac = response.fechanac.split('-')
                    let tientaDia = response.tientadia.split('-')
                    this.setState({
                        currentItemArray: response,
                        name: response.nombre, 
                        pelaje: response.pelajes.nombre,
                        encaste: response.encaste,
                        tatuaje: response.tatuaje,
                        fechanac: {
                            day: fechaNac[2],
                            month: fechaNac[1],
                            year: fechaNac[0]
                        },
                        tientadia: {
                            day: tientaDia[2],
                            month: tientaDia[1],
                            year: tientaDia[0]
                        },
                        tientaresultado: response.tientaresultado,
                        tientalugar: response.tientalugar,
                        tientatentadopor: response.tientatentadopor,
                        tientacaballo: response.tientacaballo,
                        tientacapa: response.tientacapa,
                        tientamuleta: response.tientamuleta,

                        confirmation: !this.state.confirmation
                    })
                    this.props.handleClick()
                    this.props.setGoodNotification('Actualizado exitosamente')
                    
                }).catch( async () =>{ this.props.setBadNotification('Error de conexión') } )
        } catch(e){
            this.props.setBadNotification('Error de conexión')
        }
    }
        
        pelajeSelected(event) {
            this.setState({ pelaje: event.target.attributes.value.value });
          }
        

    render() {
        return (
            <div >
                {this.state.confirmation && 
                    <ConfirmationCard 
                    handleClick={()=>this.setState({confirmation: !this.state.confirmation})} 
                    handleSubmit={this.applyUpdateEdit}  
                    />}

                {
                    this.props.currentItemArray ? 
                    
                        this.props.edit  ? 
    
                    <form onSubmit={(event)=>{
                        event.preventDefault()
                        this.setState({confirmation: !this.state.confirmation})
                        }} className="information-card">
                        
                        <CustomInput type='text' label='Nombre'  handleClick={this.formHandler} onChange={this.formHandler} name='name' value={this.state.name} placeholder={this.props.currentItemArray.nombre}/>


                        <DropdownInput
                            id='pelaje' 
                            name="pelaje"
                            handleClick={this.formHandler} 
                            onChange={this.formHandler}
                            labelName='Pelaje' 
                            value={this.state.pelaje}
                            >
                                
                            {
                                this.state.pelajeInformation ?
                                    this.state.pelajeInformation.response.map(
                                        ({ id, nombre }) =>
                                            nombre
                                            .toLowerCase()
                                            .indexOf(this.state.pelaje.toLowerCase()) > -1 ? (
                                            <button
                                                key={id}
                                                name="pelaje"
                                                value={nombre}
                                                onClick={this.pelajeSelected}
                                            >
                                                {nombre}
                                            </button>
                                            ) : (
                                            ""
                                            )
                                        )
                                    : ""
                            }
                        </DropdownInput>

                        <DropdownSelect
                            labelName='Sexo'
                        >
                            <option value="Hembra">Hembra</option>
                            <option value="Macho">Macho</option>
                        </DropdownSelect>
                      
                        <div className="date"> 
                            <label>Fecha de nacimiento</label>
                            <div className='date-section'>
                                <CustomInput name='year' value={this.state.fechanac.year} handleChange={this.handleDate} paddingWrapper='0' placeholder='Año' maxLength='4' pattern="[0-9]{4}" />
                                <CustomInput name='month' value={this.state.fechanac.month} handleChange={this.handleDate} paddingWrapper='0' placeholder='Mes' maxLength='2' pattern="[0-9]{2}" />
                                <CustomInput name='day' value={this.state.fechanac.day} handleChange={this.handleDate} paddingWrapper='0' placeholder='Dia' maxLength='2' pattern="[0-9]{2}" />
                            </div>
                        </div>
                        
                        <CustomInput label='Encaste' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='encaste' value={this.state.encaste} />
                        
                        <CustomInput label='Tatuaje' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='tatuaje' value={this.state.tatuaje} />
                        
                                <h4>Datos de la tienta</h4>

                            
                        <CustomInput label='Resultado' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='tientaresultado' value={this.state.tientaresultado} />
                
                        <CustomInput label='Tentado por' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='tientatentadopor' value={this.state.tientatentadopor} />

                        <div className="date"> 
                            <label>Fecha </label>
                            <div className='date-section'>
                                <CustomInput name='year' value={this.state.tientadia.year} handleChange={this.handleTientaDay} paddingWrapper='0' placeholder='Año' maxLength='4' pattern="[0-9]{4}" />
                                <CustomInput name='month' value={this.state.tientadia.month} handleChange={this.handleTientaDay} paddingWrapper='0' placeholder='Mes' maxLength='2' pattern="[0-9]{2}" />
                                <CustomInput name='day' value={this.state.tientadia.day} handleChange={this.handleTientaDay} paddingWrapper='0' placeholder='Dia' maxLength='2' pattern="[0-9]{2}" />
                            </div>
                        </div>

                        <CustomInput label='Lugar' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='tientalugar' value={this.state.tientalugar}/>

                        <CustomInput label='Capa' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='tientacapa' value={this.state.tientacapa}/>
                                
                        <CustomInput label='Caballo' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='tientacaballo' value={this.state.tientacaballo}/>

                        <CustomInput label='Muleta' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='tientamuleta' value={this.state.tientamuleta}/>

                        <CustomButton color='primary-blue'>Guardar Cambios</CustomButton>
                        
                    </form>
    
                        :
    
                    <div className="information-card">
    
                        <SecundaryText title='Nombre:'>{this.state.currentItemArray.nombre}</SecundaryText>

                        <SecundaryText title='Pelaje:'>{this.state.currentItemArray.pelajes && this.state.currentItemArray.pelajes.nombre}</SecundaryText>

                        <SecundaryText title='Sexo:'><span>{this.state.currentItemArray.sexo}</span></SecundaryText>
                      
                        <SecundaryText title='Encaste:'><span>{this.state.currentItemArray.encaste}</span></SecundaryText>
                        
                        <SecundaryText title='Tatuaje:'><span>{this.state.currentItemArray.tatuaje}</span></SecundaryText>
                        
                        <SecundaryText title='Fecha de nacimiento:'><span>{this.state.currentItemArray.fechanac}</span></SecundaryText>

                        <h4>Datos de la tienta</h4>
                        
                        <SecundaryText title='Resultado:'>{this.state.currentItemArray.tientaresultado}</SecundaryText>
                        
                        <SecundaryText title='Tentado por:'>{this.state.currentItemArray.tientatentadopor}</SecundaryText>
                        
                        <SecundaryText title='Fecha:'>{this.state.currentItemArray.tientadia}</SecundaryText>
                        
                        <SecundaryText title='Lugar:'>{this.state.currentItemArray.tientalugar}</SecundaryText>

                        <SecundaryText title='Capa:'>{this.state.currentItemArray.tientacapa}</SecundaryText>
                        
                        <SecundaryText title='Caballo:'>{this.state.currentItemArray.tientacaballo}</SecundaryText>
                        
                        <SecundaryText title='Muleta:'>{this.state.currentItemArray.tientamuleta}</SecundaryText>

                    </div>
                    
                    :
                    ''
                }
            </div>
        )
    }
}

const mapStatetoProps = ({ item: { currentItemArray } , user: { currentToken } })=> {
    return {
        currentItemArray , currentToken
    }
}

const mapDispatchtoProps = (dispatch)=>(
    {
        setBadNotification: (message)=>{dispatch({ type: 'SET_BAD_NOTIFICATION', payload: message})},
        setGoodNotification: (message)=>{dispatch({ type: 'SET_GOOD_NOTIFICATION', payload: message})}
    }
)  

export default connect ( mapStatetoProps, mapDispatchtoProps ) (informationCard)
