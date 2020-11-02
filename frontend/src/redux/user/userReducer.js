const INITIAL_STATE = {
    currentUser: localStorage.getItem('currentUser'),
    currentUserArray: null,
    currentUserAdmin: false,
    currentUserImagePath: localStorage.getItem('imagepath'),
    currentToken: localStorage.getItem('token')
}

const userReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SET_CURRENT_USER':
            
            return {
                ...state,
                currentUserArray: action.payload
            }
        
        case 'SET_IMAGE_PATH':
            
            localStorage.setItem('imagepath', action.payload);
            return {
                ...state,
                currentUserImagePath: action.payload
            }

        case 'LOG_IN':
            localStorage.setItem('currentUser', action.payload.name);
            localStorage.setItem('imagepath', action.payload.path);
            localStorage.setItem('token', action.payload.token)
            return {
                currentUser: action.payload.name,
                currentUserImagePath: action.payload.path,
                currentToken: action.payload.token,
            }

        case 'SAVE-TOKEN':

            localStorage.setItem('token', action.payload)
            return{
                ...state, 
                currentToken: action.payload
            }

        case 'LOG_OUT':
            localStorage.setItem('currentUser', 'userNotLoged');
            localStorage.setItem('imagepath', null);
            localStorage.setItem('token', '');
            return{
                currentUser: 'userNotLoged',
                currentUserImagePath: null
            }

        case 'ADMIN':

            return{
                ...state,
                currentUserAdmin: true
            }

        default:
            return state
    }
}





export default userReducer