import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from 'react-query'

import CustomInput from '../../component/custom-input/custom-input'
import CustomButton from '../../component/custom-button/custom-button'

const queryClient = new QueryClient()

const Div = styled.div`
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    width: 50%;
`
const Select = styled.select`
    border-radius: 4px;
    width: 100%;
    border: 1px solid #dedede;
    font-size: 20px;
    padding: 10px 10px 10px 5px;
    text-align: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: .3em 1em;
    align-items: center;
    transition: 0.6s ease;
`

function ChangeQuestionsPage({currentToken, setGoodNotification, setBadNotification}) {
    return (
        <>
         <QueryClientProvider client={queryClient}>
             <Index currentToken={currentToken} setGoodNotification={setGoodNotification} setBadNotification={setBadNotification}/>
         </QueryClientProvider>
        </>
    )
}
  

function Index({currentToken, setGoodNotification, setBadNotification}) {    
    const [fetchedData, setFetchedData] = useState([])
    const history = useHistory()


    const {isLoading, error} = useQuery('Profile data', () => {
        fetch('http://localhost:4000/user/profile/',{
            method: "GET",
            headers: {
                    "x-access-token": currentToken,
                    Accept: 'application/json', 'Content-Type': 'application/json'
                }
        })
        .then( async (res)=>{
                let {userInformation} = await res.json()
                setFetchedData(userInformation)
            })
        })
            

        const request = async (formData) => {
            await fetch(`http://localhost:4000/user/change_questions/`,{
                method: "POST",
                headers: {
                    "x-access-token": currentToken,
                },
                body: formData
            }).then ( async ( response ) => {
                let {message} = await response.json()
                if(message === 'success') {
                    setGoodNotification('Cambios realizados con exito')
                    history.push('/')
                }
            }).catch( e =>{
                setBadNotification('Error de conexión')
            }) 
        }
        const { mutate } = useMutation(request, {
            onSuccess: data =>{
            },
            onError: data =>{
            }
        })

        async function handleSubmit ({ primeraPregunta, primerarespuesta, segundapregunta, segundarespuesta }){
            let formData = new FormData();
            formData.append('primerapregunta', primeraPregunta)
            formData.append('primerapreguntarespuesta', primerarespuesta)
            formData.append('segundapregunta', segundapregunta)
            formData.append('segundapreguntarespuesta', segundarespuesta)
            try{
                mutate(formData)
            }catch(e){
            }
        } 

    if(isLoading) return (<div>loading</div>)

    if(fetchedData) return (<PageView fetchedData={fetchedData} handleSubmit={handleSubmit}/>)
}


const PageView = ({fetchedData, handleSubmit}) =>{
    const [formData, setFormData] = useState ({
        primeraPregunta: fetchedData.primerapregunta,
        segundapregunta: fetchedData.segundapregunta,
        primerarespuesta: '',
        segundarespuesta: ''
    })
    
    
    function formHandler( event ) {
        let { name, value } = event.target
        setFormData({...formData, [name]: value})
    }

    useEffect(() => {
        setFormData({
            primeraPregunta: fetchedData.primerapregunta,
            segundapregunta: fetchedData.segundapregunta,
            primerarespuesta: '',
            segundarespuesta: ''
        })
    }, [fetchedData]);

    return (
        <Div>
            <Container>
                <Select name='primeraPregunta' onChange={formHandler} >
                    <option value={formData.primeraPregunta}>{formData.primeraPregunta}</option>
                    <option value='¿Cual es el apellido del mejor amigo de su infancia?'>¿Cual es el apellido del mejor amigo de su infancia?</option>
                    <option value='¿Cual es el nombre de su primera mascota?'>¿Cual es el nombre de su primera mascota?</option>
                    <option value='¿Cual es el nombre de la ciudad donde nació?'>¿Cual es el nombre de la ciudad donde nació?</option>
                    <option value='¿Cual es su color favorito?'>¿Cual es su color favorito?</option>
                </Select>
                
                <CustomInput name='primerarespuesta' value={formData.primerarespuesta} onChange={formHandler} />

                <Select name='segundapregunta' onChange={formHandler} >
                    <option value={formData.segundapregunta}>{formData.segundapregunta}</option>
                    <option value='¿Cual es el apellido del mejor amigo de su infancia?'>¿Cual es el apellido del mejor amigo de su infancia?</option>
                    <option value='¿Cual es el nombre de su primera mascota?'>¿Cual es el nombre de su primera mascota?</option>
                    <option value='¿Cual es el nombre de la ciudad donde nació?'>¿Cual es el nombre de la ciudad donde nació?</option>
                    <option value='¿Cual es su color favorito?'>¿Cual es su color favorito?</option>
                </Select>
                
                <CustomInput name='segundarespuesta' value={formData.segundarespuesta} onChange={formHandler} />
                <CustomButton onClick={(e)=>{
                    e.preventDefault()
                    handleSubmit(formData)
                    }}> Guardar cambios</CustomButton>
            </Container>
        </Div>
    )
}


const mapStatetoProps = ({user: { currentToken }}) =>{
    return ({
        currentToken
    })
}

const mapDispatchToProps = (dispatch)=>(
    {
        setGoodNotification: (message)=>{dispatch({type:'SET_GOOD_NOTIFICATION', payload:message})},
        setBadNotification: (message)=>{dispatch({type:'SET_BAD_NOTIFICATION', payload:message})}
    }
)


export default connect(mapStatetoProps, mapDispatchToProps) (ChangeQuestionsPage)
