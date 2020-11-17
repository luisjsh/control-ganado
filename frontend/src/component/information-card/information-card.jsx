import React, { Component } from 'react'
import { connect } from 'react-redux' 

import results from '../../functions/DATA'
import resultsNumber from '../../functions/DATA_NUMBERS'

import './information-card-styles.scss'

import ConfirmationCard from '../confirmation-card/confirmation-card'
import SecundaryText from '../secundary-text/secundary-text'
import DropdownSelect from '../dropdown-select/dropdown-select'
import DropdownInput from '../dropdown-with-input-text/dropdown-with-input'
import CustomInput from '../custom-input/custom-input'
import CustomButton from '../custom-button/custom-button'
import dateHandler from '../../functions/datehandler'

class informationCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
                name: '',
                encaste: '',
                ganaderia: '',
                hierroImg: false,
                fechanac: {
                    day: '',
                    month: '',
                    year: ''
                },
                fechamuerte:{
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
                tientaresultado: {
                    capa: '',
                    muleta: '',
                    caballo: ''
                },
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
        this.handleDateDeath = this.handleDateDeath.bind(this)
        this.handleTientaDay = this.handleTientaDay.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
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
            .catch(() => this.props.setBadNotification("Error de Conexión"));
      }
      if(prevProps.edit !== this.props.edit && !this.props.edit) this.handleUpdateandMount(this.props.id)
    }

    async handleUpdateandMount(id){
        await fetch('/item/search/profile/' + id)
        .then( async responseArray => {
            let { response } = await responseArray.json()
            let fechaNac = response.fechanac.split('-')
            let fechaMuerte = response.fechamuerte.split('-')

            let tientaDia = response.tientadia.split('-')
            let tientaResultado = response.tientaresultado.split('/')

            let tientaResultadoCapa = tientaResultado[0].split('')
            let tientaResultadoCaballo = tientaResultado[1].split('')
            let tientaResultadoMuleta = tientaResultado[2].split('')

            await fetch(`/configuration/getparticularhierro/${response.hierro}`).then(async responseFromDb =>{
                    let fetchedResponse = await responseFromDb.json()
                    response && 
                    this.setState({
                        id: id , 
                        currentItemArray: response , 
                        name: response.nombre, 
                        pelaje: response.pelajes.nombre,
                        encaste: response.encaste,
                        ganaderia: response.ganaderia,
                        hierroImg: fetchedResponse.response.path,
                        fechanac: {
                            day: fechaNac[0],
                            month: fechaNac[1],
                            year: fechaNac[2]
                        },
                        fechamuerte:{
                            day: fechaMuerte[0],
                            month: fechaMuerte[1],
                            year: fechaMuerte[2]
                        },
                        tientadia: {
                            day: tientaDia[0],
                            month: tientaDia[1],
                            year: tientaDia[2]
                        },
                        tientaresultado: {
                                capa: tientaResultadoCapa.length === 6 ? `${tientaResultadoCapa[0]}${tientaResultadoCapa[1]}` : tientaResultadoCapa[0],
                                capaNumber: tientaResultadoCapa.length === 6 ? tientaResultadoCapa[4] : tientaResultadoCapa[3],
                                caballo: tientaResultadoCaballo.length === 6 ? `${tientaResultadoCaballo[0]}${tientaResultadoCaballo[1]}` : tientaResultadoCaballo[0],
                                caballoNumber: tientaResultadoCaballo.length === 6 ? tientaResultadoCaballo[4] : tientaResultadoCaballo[3],
                                muleta: tientaResultadoMuleta.length === 6 ? `${tientaResultadoMuleta[0]}${tientaResultadoMuleta[1]}` :  tientaResultadoMuleta[0],
                                muletaNumber: tientaResultadoMuleta === 6 ? tientaResultadoMuleta[4] : tientaResultadoMuleta[3]
                            },
                        tientatentadopor: response.tientatentadopor,
                        tientalugar: response.tientalugar,
                        tientacaballo: response.tientacaballo,
                        tientacapa: response.tientacapa,
                        tientamuleta: response.tientamuleta
                    })
                }).catch( ()=>{
                    response && 
                    this.setState({
                        id: id , 
                        currentItemArray: response , 
                        name: response.nombre, 
                        pelaje: response.pelajes.nombre,
                        ganaderia: response.ganaderia,
                        encaste: response.encaste,
                        fechanac: {
                            day: fechaNac[0],
                            month: fechaNac[1],
                            year: fechaNac[2]
                        },
                        fechamuerte:{
                            day: fechaMuerte[0],
                            month: fechaMuerte[1],
                            year: fechaMuerte[2]
                        },
                        tientadia: {
                            day: tientaDia[0],
                            month: tientaDia[1],
                            year: tientaDia[2]
                        },
                        tientaresultado: {
                                capa: tientaResultadoCapa.length === 6 ? `${tientaResultadoCapa[0]}${tientaResultadoCapa[1]}` : tientaResultadoCapa[0],
                                capaNumber: tientaResultadoCapa.length === 6 ? tientaResultadoCapa[4] : tientaResultadoCapa[3],
                                caballo: tientaResultadoCaballo.length === 6 ? `${tientaResultadoCaballo[0]}${tientaResultadoCaballo[1]}` : tientaResultadoCaballo[0],
                                caballoNumber: tientaResultadoCaballo.length === 6 ? tientaResultadoCaballo[4] : tientaResultadoCaballo[3],
                                muleta: tientaResultadoMuleta.length === 6 ? `${tientaResultadoMuleta[0]}${tientaResultadoMuleta[1]}` :  tientaResultadoMuleta[0],
                                muletaNumber: tientaResultadoMuleta === 6 ? tientaResultadoMuleta[4] : tientaResultadoMuleta[3]
                            },
                        tientatentadopor: response.tientatentadopor,
                        tientalugar: response.tientalugar,
                        tientacaballo: response.tientacaballo,
                        tientacapa: response.tientacapa,
                        tientamuleta: response.tientamuleta
                    })
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
    
    handleDateDeath(event){
        let{ name, value } = event.target
        this.setState({
            fechamuerte:{
                ...this.state.fechamuerte,
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

    handleSelect (event){
        let {name, value} = event.target
        this.setState({
            tientaresultado: {
                ...this.state.tientaresultado,
                [name]: value  
            } 
        })
    }

    async applyUpdateEdit(event) {
        event.preventDefault();
        let formData = new FormData()
        if(
            dateHandler(`${this.state.fechanac.day}-${this.state.fechanac.month}-${this.state.fechanac.year}`) === "everything its fine"
        ){  
            formData.append('id' , this.props.currentItemArray.id)
            formData.append('nombre' , this.state.name.toLowerCase())
            formData.append('pelaje' , this.state.pelaje)
            formData.append('fechaNac' , `${this.state.fechanac.day}-${this.state.fechanac.month}-${this.state.fechanac.year}`)
            formData.append('fechaMuerte', `${this.state.fechamuerte.day}-${this.state.fechamuerte.month}-${this.state.fechamuerte.year}`)
            //formData.append('logro' , this.state.goal)
            formData.append('ganaderia' , this.state.ganaderia.toLowerCase())
            formData.append('encaste' , this.state.encaste.toLowerCase())
            formData.append('tientaResultado', `${this.state.tientaresultado.capa} (${this.state.tientaresultado.capaNumber})/${this.state.tientaresultado.caballo} (${this.state.tientaresultado.caballoNumber})/${this.state.tientaresultado.muleta} (${this.state.tientaresultado.muletaNumber})`)
            formData.append('tientaDia' , `${this.state.tientadia.day}-${this.state.tientadia.month}-${this.state.tientadia.year}`)
            formData.append('tientaTentadoPor' , this.state.tientatentadopor.toLowerCase())
            formData.append('tientaLugar' , this.state.tientalugar.toLowerCase())
            formData.append('tientaCaballo' , this.state.tientacaballo.toLowerCase())
            formData.append('tientaCapa' , this.state.tientacapa.toLowerCase())
            formData.append('tientaMuleta' , this.state.tientamuleta.toLowerCase())
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
                        let fechaMuerte = response.fechamuerte.split('-')
                        
                        let tientaDia = response.tientadia.split('-')
                        let tientaResultado = response.tientaresultado.split('/')
            
                        let tientaResultadoCapa = tientaResultado[0].split('')
                        let tientaResultadoCaballo = tientaResultado[1].split('')
                        let tientaResultadoMuleta = tientaResultado[2].split('')  
                        this.setState({
                            currentItemArray: response,
                            name: response.nombre, 
                            pelaje: response.pelajes.nombre,
                            encaste: response.encaste,
                            ganaderia: response.ganaderia,
                            fechanac: {
                                day: fechaNac[0],
                                month: fechaNac[1],
                                year: fechaNac[2]
                            },
                            fechamuerte:{
                                day: fechaMuerte[0],
                                month: fechaMuerte[1],
                                year: fechaMuerte[2]
                            },
                            tientadia: {
                                day: tientaDia[0],
                                month: tientaDia[1],
                                year: tientaDia[2]
                            },
                            tientaresultado: {
                                capa: tientaResultadoCapa.length === 6 ? `${tientaResultadoCapa[0]}${tientaResultadoCapa[1]}` : tientaResultadoCapa[0],
                                capaNumber: tientaResultadoCapa.length === 6 ? tientaResultadoCapa[4] : tientaResultadoCapa[3],
                                caballo: tientaResultadoCaballo.length === 6 ? `${tientaResultadoCaballo[0]}${tientaResultadoCaballo[1]}` : tientaResultadoCaballo[0],
                                caballoNumber: tientaResultadoCaballo.length === 6 ? tientaResultadoCaballo[4] : tientaResultadoCaballo[3],
                                muleta: tientaResultadoMuleta.length === 6 ? `${tientaResultadoMuleta[0]}${tientaResultadoMuleta[1]}` :  tientaResultadoMuleta[0],
                                muletaNumber: tientaResultadoMuleta === 6 ? tientaResultadoMuleta[4] : tientaResultadoMuleta[3]
                            },
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
                                <CustomInput name='day' value={this.state.fechanac.day} handleChange={this.handleDate} paddingWrapper='0' placeholder='Dia' maxLength='2' pattern="[0-9]{2}" />
                                <CustomInput name='month' value={this.state.fechanac.month} handleChange={this.handleDate} paddingWrapper='0' placeholder='Mes' maxLength='2' pattern="[0-9]{2}" />
                                <CustomInput name='year' value={this.state.fechanac.year} handleChange={this.handleDate} paddingWrapper='0' placeholder='Año' maxLength='4' pattern="[0-9]{4}" />
                            </div>
                        </div>

                        <div className="date"> 
                            <label>Fecha de muerte</label>
                            <div className='date-section'>
                                <CustomInput name='day' value={this.state.fechamuerte.day} handleChange={this.handleDateDeath} paddingWrapper='0' placeholder='Dia' maxLength='2' pattern="[0-9]{2}" />
                                <CustomInput name='month' value={this.state.fechamuerte.month} handleChange={this.handleDateDeath} paddingWrapper='0' placeholder='Mes' maxLength='2' pattern="[0-9]{2}" />
                                <CustomInput name='year' value={this.state.fechamuerte.year} handleChange={this.handleDateDeath} paddingWrapper='0' placeholder='Año' maxLength='4' pattern="[0-9]{4}" />
                            </div>
                        </div>
                        
                        <CustomInput label='Encaste' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='encaste' value={this.state.encaste} />
                        
                        <CustomInput label='Ganaderia' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='ganaderia' value={this.state.ganaderia} />
                        
                                <h4>Datos de la tienta</h4>

                        <div className="date"> 
                            <label>Fecha </label>
                            <div className='date-section'>
                                <CustomInput name='day' value={this.state.tientadia.day} handleChange={this.handleTientaDay} paddingWrapper='0' placeholder='Dia' maxLength='2' pattern="[0-9]{2}" />
                                <CustomInput name='month' value={this.state.tientadia.month} handleChange={this.handleTientaDay} paddingWrapper='0' placeholder='Mes' maxLength='2' pattern="[0-9]{2}" />
                                <CustomInput name='year' value={this.state.tientadia.year} handleChange={this.handleTientaDay} paddingWrapper='0' placeholder='Año' maxLength='4' pattern="[0-9]{4}" />
                            </div>
                        </div>
                            
                        <div className="date"> 
                            <label>Resultado </label>
                            <div className='date-section'>
                                <CustomInput value={`${this.state.tientaresultado.capa} ${this.state.tientaresultado.capaNumber}`} disabled paddingWrapper='0'/>
                                <CustomInput value={`${this.state.tientaresultado.caballo} ${this.state.tientaresultado.caballoNumber}`} disabled paddingWrapper='0'/>
                                <CustomInput value={`${this.state.tientaresultado.muleta} ${this.state.tientaresultado.muletaNumber}`} disabled paddingWrapper='0'/>
                            </div>
                        </div>

                        <div className="two-grid">
                            <DropdownSelect name='capa' onChange={this.handleSelect} labelName='Capa'>
                                <option>{this.state.tientaresultado.capa}</option>
                                {
                                    results.map( ({id, name})=>(
                                        <option key={id} value={name}>{name}</option>
                                    ))
                                }
                            </DropdownSelect>

                            <DropdownSelect name='capaNumber' onChange={this.handleSelect} >
                                <option>{this.state.tientaresultado.capaNumber}</option>
                                {
                                    resultsNumber.map( ({id})=>(
                                        <option key={id} value={id}>{id}</option>
                                    ))
                                }
                            </DropdownSelect>
                        </div>

                        <div className="two-grid">
                            <DropdownSelect name='caballo' onChange={this.handleSelect} labelName='Caballo'>
                                <option>{this.state.tientaresultado.caballo}</option>
                                {
                                    results.map( ({id, name})=>(
                                        <option key={id} value={name}>{name}</option>
                                    ))
                                }
                            </DropdownSelect>
                            <DropdownSelect name='caballoNumber' onChange={this.handleSelect}>
                                <option>{this.state.tientaresultado.caballoNumber}</option>
                                {
                                    resultsNumber.map( ({id})=>(
                                        <option key={id} value={id}>{id}</option>
                                    ))
                                }
                            </DropdownSelect>
                        </div>

                        <div className="two-grid">
                            <DropdownSelect name='muleta' onChange={this.handleSelect} labelName='Muleta'>
                                <option>{this.state.tientaresultado.muleta}</option>
                                {
                                    results.map( ({id, name})=>(
                                        <option key={id} value={name}>{name}</option>
                                    ))
                                }
                            </DropdownSelect>

                            <DropdownSelect name='muletaNumber' onChange={this.handleSelect} labelName='Muleta'>
                            <option>{this.state.tientaresultado.muletaNumber}</option>
                            {
                                resultsNumber.map( ({id})=>(
                                    <option key={id} value={id}>{id}</option>
                                ))
                            }
                        </DropdownSelect>
                        </div>
                    
                        
                        <CustomInput label={this.state.currentItemArray.sexo === 'hembra' ? 'Tentada por' : 'Toreado por'} type='text' handleClick={this.formHandler} onChange={this.formHandler} name='tientatentadopor' value={this.state.tientatentadopor} />


                        <CustomInput label='Lugar' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='tientalugar' value={this.state.tientalugar}/>

                        <CustomInput label='Capa' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='tientacapa' value={this.state.tientacapa}/>
                                
                        <CustomInput label='Caballo' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='tientacaballo' value={this.state.tientacaballo}/>

                        <CustomInput label='Muleta' type='text' handleClick={this.formHandler} onChange={this.formHandler} name='tientamuleta' value={this.state.tientamuleta}/>

                        <CustomButton color='primary-blue'>Guardar Cambios</CustomButton>
                        
                    </form>
    
                        :
    
                    <div className="information-card">
    
                        <SecundaryText >
                            {
                            this.state.hierroImg && <img alt='imagen del hierro' src={this.state.hierroImg} width='100' height='100'/>
                            }
                        </SecundaryText>

                        <SecundaryText title='Nombre:'>{this.state.currentItemArray.nombre}</SecundaryText>

                        <SecundaryText title='Nro:'>
                            {this.state.currentItemArray.hierrocodigo}
                        </SecundaryText>

                        <SecundaryText title='Pelaje:'>{this.state.currentItemArray.pelajes && this.state.currentItemArray.pelajes.nombre}</SecundaryText>

                        <SecundaryText title='Sexo:'><span>{this.state.currentItemArray.sexo}</span></SecundaryText>
                      
                        <SecundaryText title='Encaste:'><span>{this.state.currentItemArray.encaste}</span></SecundaryText>
                        
                        <SecundaryText title='Ganaderia:'><span>{this.state.currentItemArray.ganaderia}</span></SecundaryText>
                        
                        <SecundaryText title='Fecha de nacimiento:'><span>{this.state.currentItemArray.fechanac}</span></SecundaryText>

                        <SecundaryText title='Fecha de muerte:'><span>{this.state.currentItemArray.fechamuerte}</span></SecundaryText>
                        
                        <h4>Datos de la tienta</h4>
                        
                        <SecundaryText title='Resultado:'>{this.state.currentItemArray.tientaresultado}</SecundaryText>
                        
                        <SecundaryText title={this.state.currentItemArray.sexo === 'hembra' ? 'Tentada por:' : 'Toreado por:'}>{this.state.currentItemArray.tientatentadopor}</SecundaryText>
                        
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
