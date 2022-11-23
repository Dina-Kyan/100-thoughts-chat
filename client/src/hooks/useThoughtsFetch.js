
import React from 'react'
import { useSelector } from 'react-redux'


function useThoughtsFetch(url) {
    const [thoughts, setThoughts] = React.useState([])
    const [loading, setloading] = React.useState(false)
    const user = useSelector(state => state.userReducer);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    const getAllToughts = (page = 1) => {
        setloading(true)
        const request = url === 'thoughts' ? { page } : { page, author: user.name };
        try {
            fetch(`http://localhost:5000/${url}`, {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(result => {
                    return result.json()
                }).then(result => {
                    setThoughts(result.thoughts);
                    setTotalPages(result.totalPages);
                    setloading(false)
                })
        } catch (error) {
            alert(':(');
        }
    }

    const changePage = (num) => {
        if (page + num === 0 || page + num > totalPages) return;
        else {
            getAllToughts(page + num);
            setPage(num + page);
        }
    }

    React.useEffect(() => {
        getAllToughts()
    }, []);

    return {
        loading,
        changePage,
        thoughts
    }
}

export default useThoughtsFetch;