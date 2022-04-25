import React, {useState} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from 'react-query'
import { Table, Checkbox } from 'antd'
import moment from 'moment'

import CustomButton from '../../component/custom-button/custom-button'

const queryClient = new QueryClient()

const Title = styled.h1`

`

const Body = styled.body`
    padding: 1em;
`

function HistoryUserWrapper({currentToken}) {
  return (
      <QueryClientProvider client={queryClient}>
        <HistoryUserPage currentToken={currentToken} />
      </QueryClientProvider>
  )
}


function HistoryUserPage ({currentToken}){
    
    const columns = [
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre'
        },{
            title: 'Ultima conexion',
            dataIndex: 'last_connection',
            key: 'last_connection',
            render: (text, record) => {
              const obj = {
                children: text === '' ? '-' : moment(record.last_connection).format('DD/MM/YYYY'),
              }
              return obj
            }
        },{
            title: 'admin',
            dataIndex: 'admin',
            key: 'admin',
            render: (text, record) => {
                const obj = {
                    children: <Checkbox checked={record.admin} />,
                }
                return obj
            }
        },{
            title: 'Estado',
            dataIndex: 'status',
            key: 'status'
        },{
            title: "Accion",
            render: (text, record) => {
                const obj = {
                  children: record.status === 'activo' ? 
                    <CustomButton style={{width: '50%', padding: '0 1em'}} color='disabled' disabled>Desbloquear</CustomButton> : 
                    <CustomButton 
                        style={{width: '50%', padding: '0 1em'}} 
                        color='primary-blue'
                        onClick={()=>mutate(record.id)}
                        >Desbloquear
                    </CustomButton>,
                }
                return obj
            }
        }]

    const [fetchedData, setFetchedData] = useState([])


    const getUsers = () =>{
        fetch('http://localhost:4000/user/getLastConnections', {
            method: 'GET',
            headers: {
                "x-access-token": currentToken,
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
        })
        .then(async (res)=> {
            let {response} = await res.json()
            setFetchedData(response)
        })
    }
    
    const { isLoading, error } = useQuery("tableData", getUsers)


    const request = async (id) => {
        await fetch(`http://localhost:4000/user/unlock_user/${id}`,{
            method: "GET",
            headers: {
                "x-access-token": currentToken,
            },
        }).then ( async ( response ) => {
            let {message} = await response.json()
            if(message === 'success') {
                // setGoodNotification('Cambios realizados con exito')
                getUsers()
            }
        }).catch( e =>{
            // setBadNotification('Error de conexión')
        }) 
    }
    const { mutate } = useMutation(request, {
        onSuccess: data =>{
        },
        onError: data =>{
        }
    })

    if(isLoading) return <div>Loading</div>
    
    if(error) return <div>{error.message}</div>

    return (
        <div>
            <header style={{textAlign: 'center'}}>
                <Title>Historial de inicio de sesion usuarios</Title>
            </header>
            <Body>
                <Table
                    columns={columns}
                    loading={isLoading}
                    dataSource={fetchedData}
                    pagination={false}
                    key='email'
                    />
            </Body>
        </div>
    )
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

export default connect(mapStatetoProps, null)(HistoryUserWrapper);
