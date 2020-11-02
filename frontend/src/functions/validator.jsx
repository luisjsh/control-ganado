import store from '../redux/store'

function validator (  detail , history ) {
    switch(detail){

        case 'error de conexion':
            store.dispatch(setBadNotification('Error de conexion'))
            break;

        case 'token invalid':
            store.dispatch(logOut())
            store.dispatch(setBadNotification('Por favor vuelva a iniciar sesion'))
            history.push('/login')
            break;

        case 'token expired':
            store.dispatch(logOut())
            store.dispatch(setBadNotification('Por favor vuelva a iniciar sesion'))
            history.push('/login')
            return 

        case 'problem db':
            store.dispatch(setBadNotification('Error con la base de datos'))
            break;
        
        case "user not registered":
            store.dispatch(logOut())
            history.push('/login')
            break;

        case 'not allowed':
            return

        case 'isnt on db':
            store.dispatch(setBadNotification('El contenido no se encuentra registrado en la base de datos'))
            history.push('/')
            break;

        case 'admin granted':
            store.dispatch(setAdmin())
            break;
            
        default:
            
    }
}

const logOut = ()=>{
    return { 
       type: 'LOG_OUT'
    }
}

const setBadNotification = (message) => {
    return {
        type: 'SET_BAD_NOTIFICATION',
        payload: message
    }
}

const setAdmin = ()=>{
    return {
        type: 'ADMIN'
    }
}

export default validator;