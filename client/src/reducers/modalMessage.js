
const modalMessage = (state = '', action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return state = action.payload;
        default:
            return state
    }
}

export default modalMessage