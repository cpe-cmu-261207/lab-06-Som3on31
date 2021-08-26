import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

//incorrectly declared, now fixed
type Data = {
    time: {
        updated: string;
        updatedISO: string;
        updateduk: string;
    };
    disclaimer: string;
    bpi: {
        USD: {
            code: string;
            rate: string;
            description: string;
            rate_float: number;
        },
        THB: {
            code: string;
            rate: string;
            description: string;
            rate_float: number;
        }
    };
}


const Current = () => {
    //code here
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [data, setData] = useState<Data | null>(null)

    const fetchApi = async () => {
        try {
            const response = await axios.get<Data| null>(`https://api.coindesk.com/v1/bpi/currentprice/thb.json`)
            console.log(response.data)
            setData(response.data)
            console.log(data)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setError(true)
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchApi()
    }, [])

    const render = () => {
        if (loading) return (<p className='text-2xl'>Loading ...</p>)
        else return (
            <div>
                <p className='text-2xl'>{data?.bpi.THB.rate_float.toLocaleString()} THB</p>
                <p>Last updated {data?.time.updated}</p>
            </div>
        )
    }

    return (
        <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>Current price</p>
            {render()}
        </div>
    )
}

export default Current