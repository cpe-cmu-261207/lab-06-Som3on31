import { BrowserRouter as Router, Switch, Link, Route, useLocation, useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

type HistoryData = {
    bpi: Object;
    // disclaimer: string;
    // time: {
    //     updated: string;
    //     updatedISO: string;
    // }
}

const History = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [err, setErr] = useState<boolean>(false)
    const [histData, setHistData] = useState<HistoryData | null>(null)
    const [starto, setStarto] = useState<string>('')
    const [endo, setEndo] = useState<string>('')

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQuery()

    const fetchApi = async () => {
        try {
            const resp = await axios.get<HistoryData | null>(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${query.get('start')}&end=${query.get('end')}`)
            console.log(resp.data)
            setHistData(resp.data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setErr(true)
            setLoading(false)
        }
    }

    const render = () => {

        if (loading) {
            console.log(histData?.bpi)
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-2xl'>Loading ...</p>
                </div>
            )
        } else if (!err) {
            console.log(histData?.bpi)
            return (
                <div>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    {fillData()}
                    <p className='text-xl font-semibold'> From {starto} To {endo}</p>
                </div>
            )
        } else {
            return (
                <ul>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
                </ul>
            )
        }
    }

    const fillData = () => {
        let switchPlace = Date.parse(starto) < Date.parse(endo) //I had to make this or I cannot read it just like the later line below
        let isEmpty: boolean = starto === '' || endo === ''
        // let history = useHistory()

        if (switchPlace || isEmpty) {
            alert('Please select start date and end date correctly.')
            // history.push('/history/select')
        }
        else {
            let extractedData = []
            console.log(histData?.bpi)
            // for (const [key, value] of Object.entries(histData?.bpi)) {

            // }
            return (
                <li className='text-xl'>kek - {(0).toLocaleString()} THB</li>   //wip
            )
        }
    }


    return (
        <div>
            {render()}
        </div>
    )
}


export default History