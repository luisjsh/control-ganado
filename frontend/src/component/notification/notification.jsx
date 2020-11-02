import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import reactDOM from 'react-dom'

import {
    Page, 
    NotificationWrapper, 
    NotificationText } from './notification-styles'


function Notification({notificationData, setNotification}) {

    let showNotification = 'appear';

    const handleUpdate=()=>{
        setTimeout( ()=>{
            showNotification = 'disappear'
                setNotification([])
            }, 10000
        )
    }

    useEffect(handleUpdate, [notificationData, showNotification])
    
    return (
        reactDOM.createPortal(
            <Page>
                {
                    notificationData ? 
                    notificationData.map( ({id, name, type})=>(
                        <NotificationWrapper appear={showNotification} key={id}>
                            <NotificationText type={type}>
                                {name}
                            </NotificationText>
                        </NotificationWrapper>
                    ))
                    : ''
                }
            </Page>,
            document.querySelector('#modal')
        )
    )
}

const mapStatetoProps = ({notification: {notificationData}}) => {
    return {
        notificationData
    }
}

const mapDispatchtoProps = (dispatch)=>(
    {
        setNotification: (notificationData)=>{dispatch({type:'SET_NOTIFICATION', payload:notificationData})}
    }
)

export default connect(mapStatetoProps, mapDispatchtoProps) (Notification);
