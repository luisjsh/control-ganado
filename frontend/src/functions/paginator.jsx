import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import validator from './validator'

function Paginator(title, pageNumber) {
    let [loading, setLoading ] = useState(false)
    let [error, setError ] = useState(false)
    let [items, setItems ] = useState([])
    let [hasMore, setHasMore] = useState(false)

    let history = useHistory()
    
    useEffect(()=>{
        setLoading(true)
        setError(false)
        
        let cancel
        axios({
            method: 'GET',
            url: `/item/${pageNumber}`,
            cancelToken: new axios.CancelToken( c => cancel=c)
        }).then(res => {
            if(res.data.message) return validator(res.data.message, history)

            setItems(prevItems =>{
                return [...new Set([...prevItems, ...res.data.fetchedData])]
            })
            setHasMore(res.data.pages > pageNumber)
            setLoading(false)
        }).catch( e => {
            if(axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    },[title, pageNumber, history])

    return {
        loading, error, items, hasMore
    }
}

export default Paginator
