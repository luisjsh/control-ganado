import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import validator from '../../functions/validator'

import './item-page-style.scss'

import ConfirmationCard from '../confirmation-card/confirmation-card'
import ImageCarousel from '../image-carousel/image-carousel'
import ImageCard from '../image-card/image-card'
import CardCarousel from '../cards-carousel/cards-carousel'
import InformationCard from '../information-card/information-card'

class ItemPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmation: false,

            edit: false,
            //edit-values
            name: '',
            pelaje: '',
            fechanac: '',

            currentItemArray: false,
            grandParents: false,
            parents: false,
            childs: false,
            grandChilds: false
        }

        this.updateInformation = this.updateInformation.bind(this);
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount(){
        this.setState({ verifyUpdate : this.props.currentItemArray , id: this.props.match.params.id})
        this.updateInformation(this.props.match.params.id)
    }

    async componentDidUpdate(prevProps, prevState){
        
        if(this.props.match.params.id !== prevProps.match.params.id) this.updateInformation(this.props.match.params.id)

        if(prevState.edit !== this.state.edit ) {
            try{
                await fetch('http://localhost:4000/item/search/profile/' + this.props.match.params.id)
                    .then( async responseArray => {
                        let { response } = await responseArray.json()
                        this.setState({currentItemArray: response , id: this.props.match.params.id })
                        this.props.setItem(response)
                    })
            }catch(e){
                this.props.setBadNotification('Error de conexión al actualizar la información del perfil')
            }
        }
    }

    async updateInformation(id){
        await fetch('http://localhost:4000/item/search/profile/' + id)
            .then( async responseArray => {
                let { response, detail } = await responseArray.json()

                if(detail){
                    validator(detail, this.props.history)
                } 
                
                if (response){
                    this.setState({currentItemArray: response , id: id })
                    this.props.setItem(response)
                }
            })

        await fetch('http://localhost:4000/item/search/family/parents/'+ id)
            .then( async responseArray => {
                let { parents , grandParents , detail} = await responseArray.json()
                
                if(detail) validator(detail, this.props.history)

                if(parents || grandParents){
                    this.setState({
                        parents: parents.length > 0 ? parents : false,
                        grandParents: grandParents.length > 0 ? grandParents : false
                    })
                }
            })

            
            await fetch('http://localhost:4000/item/search/family/child/' + id).then( async response => {
                let { detail , responseArray } = await response.json()

                if (detail.search('has childs') !== -1){
                    
                    this.setState({ childs: {response: responseArray} })

                let i=0;
                let grandChildArr = [];
                for( i = 0; i<this.state.childs.response.length; i++){
                    await fetch('http://localhost:4000/item/search/family/child/' + this.state.childs.response[i].id )
                        .then( async response => {
                        let { detail , responseArray } = await response.json()

                        if (detail.search('has childs') !== -1){
                            let i = 0;
                            for( i=0; i<responseArray.length; i++){
                                grandChildArr.push( responseArray[i] )
                            }
                        }

                        })
                }

                grandChildArr.length > 0 ? this.setState({ grandChilds: {response: grandChildArr}}) : this.setState({ grandChilds: { response: false}})

                
             } else if (detail.search('nochilds') !== -1){
                
                this.setState({ childs: {response: false},  grandChilds: { response: false}})
             }


             
         })   
       
    }
    

    async handleEdit(){
        this.setState({edit: !this.state.edit})  
    }

    async handleDelete(){
        await fetch("http://localhost:4000/item/destroy/"+this.props.match.params.id, {
      method: "GET",
      headers: {
        "x-access-token": this.props.currentToken,
      },
    })
      .then(async (response) => {
        let {message} = await response.json()
        
        if(message === 'succesfully'){
          this.props.setGoodNotification('Eliminado exitosamente')
          this.setState({confirmation: !this.state.confirmation})
          this.props.history.push('/')
        }

        if(message === 'no entry'){
          this.props.setBadNotification('El pelaje introducido no se encuentra en la base de datos')
          this.setState({confirmation: !this.state.confirmation})
        }
      })
      .catch((e) => {
        console.log(e)
        this.setState({confirmation: !this.state.confirmation})
        this.props.setBadNotification("Error de conexion")});
    }

      render(){   
        return(
            <div className='item-page'>
                {this.state.confirmation && 
                    <ConfirmationCard 
                        handleClick={()=>this.setState({confirmation: !this.state.confirmation})}
                        handleSubmit={this.handleDelete}
                />}
                <div className="profile-section">
                <ImageCarousel id={this.props.currentItemArray.id} context='item' />
                
                    <div className="information-card">
                        
                        <div className="information-title">
                        <span>{this.props.currentItemArray.nombre}</span>
                        {
                            this.props.currentUserAdmin &&
                                <button className='edit' onClick={this.handleEdit}></button>
                        }

                        {
                            this.props.currentUserAdmin &&
                                <button className='erase' onClick={()=>this.setState({confirmation: !this.state.confirmation})}></button>
                        }
                        </div>
                        
                        {
                            this.state.currentItemArray ?
                            
                            <InformationCard id={this.state.id} edit={this.state.edit} handleClick={()=>this.setState({edit: !this.state.edit})}  updateInformation={this.updateInformation} />

                            :

                            ''
                        }
                    </div>
                </div>

                <div className="results-side">
                    <span className='main-title'>{this.state.currentItemArray.nombre}</span>

                    <CardCarousel title='Padres' itemArray={this.state.parents.response}>
                    {
                                   this.state.parents ? 

                                   this.state.parents.map( ({id, nombre, hierro, torosimagenes , fechanac, tientadia, tientaresultado, tientatentadopor,tientalugar}, index) =>(
                                                  <ImageCard
                                                  key={id}
                                                  hierro={hierro}
                                                  nombre={nombre}
                                                  fechanac={fechanac.slice(2, 4)}
                                                  animationDelay={index}
                                                  imagenes={torosimagenes} 
                                                  tientaDia={tientadia}
                                                  tientaResultado={tientaresultado}
                                                  tientaTentadoPor={tientatentadopor}
                                                  tientaLugar={tientalugar}
                                                  handleClick={() => {
                                                      this.updateInformation(id);
                                                      this.props.history.push('/item/'+id)
                                                  }}
                                              />
                                   ))
                                   : <div className='no-response'> </div> 
                                }
                    </CardCarousel>
                    <CardCarousel title='Abuelos' itemArray={this.state.childs.response}>
                                    {
                                          this.state.grandParents ? 
                                               this.state.grandParents.map( ({id, nombre, hierro, torosimagenes , fechanac, tientadia, tientaresultado, tientatentadopor,tientalugar}, index) =>(
                                                <ImageCard
                                                key={id}
                                                hierro={hierro}
                                                nombre={nombre}
                                                fechanac={fechanac.slice(2, 4)}
                                                animationDelay={index}
                                                imagenes={torosimagenes} 
                                                tientaDia={tientadia}
                                                tientaResultado={tientaresultado}
                                                tientaTentadoPor={tientatentadopor}
                                                tientaLugar={tientalugar}
                                                handleClick={() => {
                                                    this.updateInformation(id);
                                                    this.props.history.push('/item/'+id)
                                                    }}
                                                />
                                            ))

                                        : <div className='no-response'> </div> 
                                    }
                        
                    </CardCarousel>
                    <CardCarousel title='Hijos' itemArray={this.state.childs.response}>
                    {
                                    this.state.childs ? 

                                        this.state.childs.response ? 
                                        
                                        this.state.childs.response.map( ({id, nombre, hierro, torosimagenes , fechanac, tientadia, tientaresultado, tientatentadopor,tientalugar}, index) =>(
                                            <ImageCard
                                            key={id}
                                            hierro={hierro}
                                            nombre={nombre}
                                            fechanac={fechanac.slice(2, 4)}
                                            animationDelay={index}
                                            imagenes={torosimagenes}
                                            tientaDia={tientadia}
                                            tientaResultado={tientaresultado}
                                            tientaTentadoPor={tientatentadopor}
                                            tientaLugar={tientalugar}
                                            handleClick={() => {
                                                this.updateInformation(id);
                                                this.props.history.push('/item/'+id)
                                            }}
                                        />
                             ))
                                        : <div className='no-response'> </div>

                                    :

                                    ''
                        }
                    </CardCarousel>
                    <CardCarousel title='Nietos' itemArray={this.state.grandChilds.response}>
                    {
                                    this.state.grandChilds ? 

                                        this.state.grandChilds.response ? 
                                        
                                        this.state.grandChilds.response.map( ({id, nombre, hierro, torosimagenes , fechanac, tientadia, tientaresultado, tientatentadopor,tientalugar}, index) =>(
                                            <ImageCard
                                            key={id}
                                            hierro={hierro}
                                            nombre={nombre}
                                            fechanac={fechanac.slice(2, 4)}
                                            imagenes={torosimagenes}
                                            animationDelay={index}
                                            tientaDia={tientadia}
                                            tientaResultado={tientaresultado}
                                            tientaTentadoPor={tientatentadopor}
                                            tientaLugar={tientalugar}
                                            handleClick={() => {
                                                this.updateInformation(id);
                                                this.props.history.push('/item/'+ id)
                                            }}
                                        />
                                        ))
                                        
                                        : <div className='no-response'> </div>

                                    :

                                    ''
                        }
                    </CardCarousel>                    
                </div>
            </div>
        )
    }
}

const mapDispatchtoProps = (dispatch) => ({
    setItem: (itemData) => dispatch({ type: "SET_CURRENT_ITEM", payload: itemData }),
    setBadNotification: (message) => dispatch({ type: 'SET_BAD_NOTIFICATION', payload: message}),
    setGoodNotification: (message) => dispatch({ type:'SET_GOOD_NOTIFICATION' , payload: message})
});
  
const mapStatetoProps = ({
    item: {
      currentItemArray
    }, user:{
        currentUserAdmin,
        currentToken
    }
  }) => {
    return {
        currentItemArray,
        currentUserAdmin,
        currentToken
    };
  };
export default connect (mapStatetoProps, mapDispatchtoProps) (withRouter(ItemPage))