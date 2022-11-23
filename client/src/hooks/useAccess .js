
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

function useAccess (bool=false) {
    const isLogged = useSelector(state => state.isLogged);
    const navigate = useNavigate();

    const checkLoggedUser = () => {
        if ((!bool && !isLogged) || (bool && isLogged)) navigate('/', { replace: true });
    }

    React.useEffect(() => {
        checkLoggedUser();
    }, []);

}

export default useAccess;