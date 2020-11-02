import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { debounce } from 'lodash'

import validator from '../../functions/validator'

import './search-bar-style.scss'

import CustomInput from '../custom-input/custom-input'

class searchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
                searchbar: '',
                cursor: 0,
                result: false
        }
        this.handleFocus = React.createRef();
        this.handlePress = this.handlePress.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.fetchResults = this.fetchResults.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this)
    }


    /*    componentDidMount(){
        document.addEventListener('onkeydown', ()=>{
            console.log('pressed!')
        })
    }*/

    handlePress(e){
        let { cursor } = this.state

            if (e.keyCode === 38 ){
                e.preventDefault()
                if( this.state.cursor > 0){ 
                let less = cursor - 1
                this.setState({cursor: less})
                }
                this.handleFocus.current.focus()

            } else if ( e.keyCode === 40){
                e.preventDefault()
                if ( this.state.cursor < this.state.result.length-1){ //if the result.length its equal to cursor ill cause an error, cursor always has to be lower
                    let plus = cursor + 1
                    this.setState({cursor: plus})
                }
                    this.handleFocus.current.focus()
                
            }
    }

    componentDidUpdate(prevProps, prevState){
    
        if(prevState.searchbar !== this.state.searchbar){
           this.fetchData()
        }
    }

    fetchData = debounce(async ()=>{
        if(this.state.searchbar.length > 0){
            await fetch('http://localhost:4000/search/'+this.state.searchbar).then( async searchResult =>{
                let {response, detail} = await  searchResult.json()

                if(detail) validator(detail, this.props.history)

                if(response){
                    if(response.length === 0) this.setState({result: false})
                    if(response.length > 0) this.setState({result: response})
                } 
            })
        }

        if(this.state.searchbar.length === 0) this.setState({result: false})
    }, 300)

    formHandler(event) {
        event.preventDefault()
        let { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleEnterKeyPress(event){
        event.preventDefault()
        this.props.history.push('/search/'+this.state.searchbar)
        this.setState({ result: false })
    }


   

    async fetchResults(value){

        if(value.length > 0){

            await fetch('http://localhost:4000/search/'+value)
                .then( async Response =>{
                    let { response } = await Response.json()

                    if( response.length > 6){
                        response.length = 6
                    }

                    this.setState({result: response})
                })

        }
    }

    render() {
        let {cursor} = this.state
        return (
            <div className='searchbar' onKeyDown={this.handlePress}>
                <form  onSubmit={this.handleEnterKeyPress} className='search-inputs' > 
                    <CustomInput 
                        name='searchbar' 
                        value={this.state.searchbar} 
                        handleChange={this.formHandler} 
                        autoComplete='off'/>
                    
                    <button className="search-icon" tabIndex={0}>

                    </button>
                </form>

                <div 
                    className="search-results" 
                    >
                        { this.state.result && this.state.result.map( (item, id) =>(
                                <button 
                                    key={item.id} 
                                    className='result' 
                                    tabIndex={0} 
                                    onClick={()=>{
                                        this.props.history.push('/item/'+item.id) 
                                        this.setState({result: false})
                                    }}  
                                    ref={ cursor === id && this.handleFocus }>
                                    
                                    { item.nombre }
                                
                                </button>
                            ))  
                        }
                    </div>
            </div>
        )
    }
}

export default withRouter(searchBar)
