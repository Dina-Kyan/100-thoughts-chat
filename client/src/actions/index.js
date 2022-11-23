
export const setIsLogged = (bool) => {
    return {
        type: 'SET_LOGGED',
        payload: bool
    }
}

export const setUser = (obj) => {
    return {
        type: 'SET_USER',
        payload: obj
    }
}

export const setMessage = (str) => {
    return {
        type: 'SET_MESSAGE',
        payload: str
    }
}

export const setThoughts = (str) => {
    return {
        type: 'SET_THOUGHTS',
        payload: str
    }
}