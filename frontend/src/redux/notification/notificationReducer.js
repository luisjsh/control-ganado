const INITIAL_STATE = {
    notificationData: []
}

const notificationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':

            return {
                notificationData: action.payload
            }

            case 'SET_GOOD_NOTIFICATION':

                return {
                    notificationData: [
                        ...state.notificationData, {
                            id: state.notificationData.length + 1,
                            name: action.payload,
                            type: 'fine'
                        }
                    ]
                }

                case 'SET_BAD_NOTIFICATION':

                    return {
                        notificationData: [
                            ...state.notificationData, {
                                id: state.notificationData.length + 1,
                                name: action.payload,
                                type: 'notfine'
                            }
                        ]
                    }

                    default:
                        return state
    }
}

export default notificationReducer
