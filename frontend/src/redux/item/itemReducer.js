const INITIAL_STATE = {
    currentItemArray: false,
    images: false
}

const userReducer = (state = INITIAL_STATE, action) =>{

    switch(action.type){
        case 'SET_CURRENT_ITEM':
            
            return {
                currentItemArray: action.payload,
                images: action.payload.torosimagenes
            }
        
        default:
            return state
    }

}

export default userReducer;