import React, {useState} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Table, Checkbox } from 'antd'
import moment from 'moment'

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
  
    }]

function HistoryUserPage ({currentToken}){

    const [fetchedData, setFetchedData] = useState([])

    const { isLoading, error } = useQuery("tableData", () => {
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
                    dataSource={fetchedData}
                    pagination={false}
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
