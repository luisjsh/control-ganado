import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './navbar-style.scss'

import validator from '../../functions/validator'

import SearchBar from '../search-bar/search-bar'
import InfoCard from '../info-card/infocard'

class Nav extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user: null,
            admin: false
        }

        this.Redirect = this.Redirect.bind(this);
        this.LogOut = this.LogOut.bind(this);
        this.correctHeight = this.correctHeight.bind(this);
        this.setUserForProfile = this.setUserForProfile.bind(this);
        this.UpdateStatus = this.UpdateStatus.bind(this)
    }



     componentDidMount(){
        this.UpdateStatus()
        if(this.props.currentUser === 'userNotLoged' && this.props.location.pathname !== '/signup'){
            this.props.logOut()
            this.props.history.push('/login')
        }
    }
    
    
    componentDidUpdate(prevProps){
        if(prevProps.currentUser !== this.props.currentUser) this.UpdateStatus()
        if(prevProps.currentToken !== this.props.currentToken) this.UpdateStatus()
    }


    async UpdateStatus ( ){
        if ( this.props.currentToken ){
        
            await fetch("http://localhost:4000/user/admin", {
                method: "GET",
                headers: {
                  "Content-type": "application/json",
                  "x-access-token": this.props.currentToken,
                },
              })
                .then(async (response) => {
                    let { detail } = await response.json();
                    validator(detail , this.props.history)
                   
                })
                .catch(() => this.props.setBadNotification("Error de conexión"))
            }
    }

    //------------- Redirect ---------

    Redirect (event){
        let value = event.target.attributes.value.value;
        this.props.history.push('/'+value)
    }

    //--------------- correct height ---------------------

    correctHeight(){
        this.setState({height: '40px'})
    }

    LogOut(){
        this.props.history.push('/login')
        this.props.logOut()
    }

    async setUserForProfile( ){
        await fetch('http://localhost:4000/user/profile/',{
            method:'GET',
            headers:{
                'Content-type' :'application/json',
                'x-access-token' : this.props.currentToken
            }
        } ).then(async response =>{
            if (response.status === 401 ){
                this.props.setBadNotification('Por favor vuelva a iniciar sesion')
                this.props.history.push('/login')
            } else {
            let { userInformation } = await response.json()
            this.props.setUser(userInformation)
            this.props.history.push('/profile/')
            }
        }).catch( e =>{
            this.props.setBadNotification(e)
        })
    }

    //--------------------------------------------------

    render(){
        return(
            <div className='grid-area'>
                <nav className='navbar'>
                    <div className="logo" value='' onClick={this.Redirect} tabIndex={0}>

                    </div>
                       
                    <SearchBar paddingWrapper='0 1em' />
                       
                    {
                        this.props.currentUser !== 'userNotLoged'  ?
                        
                    <div className='info-section'>

                        {
                            this.props.currentUserImagePath === 'false' || this.props.currentUserImagePath === false  ?
                            
                                <button className='no-image'>
    
                                </button>
    
                                :
    
                                <button className='info' style={{background: 'url(http://localhost:4000'+this.props.currentUserImagePath +') center center / 80px no-repeat'}}>
                          
                                </button>
                        }    

                    

                    <div className='information-card'>

                        <InfoCard
                        user={this.props.currentUser}
                        image={this.props.currentUserImagePath} 
                        profile={this.setUserForProfile} 
                        addMore={this.Redirect}
                        LogOut={this.LogOut} 
                        />

                    </div>
                         

                    </div>

                        :      
                    
                    
                    <button className='profile-info' value='login' onClick={this.Redirect}>
                        Iniciar Sesión
                    </button>

                    } 

                    {this.props.currentUserAdmin ? 
                            <button
                            value="add-res"
                            tabIndex={3}
                            className='button'
                            onClick={this.Redirect}
                            ></button>
                             : 
                                    ""
                    }   
                </nav>
            </div>
        )
    }
}


const mapStatetoProps = ({user: {currentUser , currentUserAdmin, currentUserImagePath, currentToken}}) =>{
    return ({
        currentUser, currentUserAdmin, currentUserImagePath, currentToken
    })
}

const mapDispatchtoProps = ( dispatch )=>(
    {
        admin: () => dispatch({ type: "ADMIN" }),
        setBadNotification: (message) =>dispatch({type:'SET_BAD_NOTIFICATION', payload: message }),
        logOut: ()=>{dispatch({type:'LOG_OUT'})},
        setUser: user =>{dispatch({type:'SET_CURRENT_USER' , payload: user})}
    }
)

export default  connect (mapStatetoProps, mapDispatchtoProps) (withRouter(Nav))