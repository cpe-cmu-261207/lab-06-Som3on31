import { Link, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

type HistoryData = {
    bpi: Record<string, number>
    disclaimer: string;
    time: {
        updated: string;
        updatedISO: string;
    }
}




const History = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [err, setErr] = useState<boolean>(false)
    const [histData, setHistData] = useState<HistoryData | null>(null)

    const fetchApi = async () => {
        try {
            const resp = await axios.get<HistoryData | null>(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=2021-08-01&end=2021-08-07`)
            console.log(resp.data)
            setHistData(resp.data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setErr(true)
            setLoading(false)
        }
    }

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }


    const loadData = () => {
        let query = useQuery



        return (
            <div>

            </div>
        )
    }


    const render = () => {
        if (loading) {
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-2xl'>Loading ...</p>
                </div>
            )
        } else if (!err) {
            <div>
                



                <p className='text-xl font-semibold'> ( From 2021-01-01 To 2021-01-02)</p>
            </div>
        } else {
            return (
                <ul>
                    <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>

                </ul>
            )
        }
    }



    return (
        <div className='text-center space-y-3 space-x-3'>
            <p className='text-2xl font-semibold'>Select historical range</p>
            <span>From date</span>
            <input type='date' onChange={e => console.log(e.target.value)} id='before'></input>
            <span>To date</span>
            <input type='date' onChange={e => console.log(e.target.value)} id='after'></input>
            <br />
            <Link to='/history/result'><button>Get data</button></Link>

            <switch>
                <Route path='/history/result'>
                    {render()}
                </Route>
            </switch>


        </div>
    )
}

export default History

    // <li className='text-xl'>2021-01-01 - {(1000000).toLocaleString()} THB</li> template
    // <li className='text-xl'>2021-01-02 - {(2000000).toLocaleString()} THB</li>
    // <li className='text-xl'>2021-01-03 - {(3000000).toLocaleString()} THB</li>

    // <switch>
    // <Route path='/history/result'>

    // </Route>
    //         </switch>