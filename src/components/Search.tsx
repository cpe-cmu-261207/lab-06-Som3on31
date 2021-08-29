import { BrowserRouter as Router, Switch, Link, Route, useLocation, useHistory, Redirect } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Result from './Result'


type HistoryData = {
    bpi: Object;
    disclaimer: string;
    time: {
        updated: string;
        updatedISO: string;
    }
}

const History = () => {

    let loading = true
    let errLoading = false
    const [histData, setHistData] = useState<HistoryData | null>(null)
    const [starto, setStarto] = useState<string>('')
    const [endo, setEndo] = useState<string>('')

    // const useQuery = () => {
    //     return new URLSearchParams(useLocation().search)
    // }

    // const query = useQuery()

    const fetchApi = async (fetchLink: string) => {
        try {
            const resp = await axios.get<HistoryData | null>(fetchLink)
            setHistData(resp.data)
            loading = false
        } catch (err) {
            console.log(err)
            loading = false
            errLoading = true
        }

    }

    let history = useHistory()

    //not working atm. Goal: make this one return to the same page if dates are incorrectly filled
    const allFilledOrNot = () => {
        let switchPlace = Date.parse(starto) > Date.parse(endo) //I had to make this or I cannot read it just like the later line below
        let isEmpty: boolean = starto === '' || endo === ''
        // let history = useHistory()

        if (switchPlace || isEmpty) {
            alert('Please select start date and end date correctly.')
            history.push('/history/result')
            history.goBack()
        } else {
            const fetchHere = 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=' + starto + '&end=' + endo
            fetchApi(fetchHere)
        }
    }

    const render = () => {
        
        if (loading) {
            // console.log(data?.bpi)
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-2xl'>Loading ...</p>
                </div>
            )
        } else if (!errLoading) {
            // console.log(data?.bpi)
            return (
                <div>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-xl font-semibold'> From {starto} To {endo}</p>
                    {histData}
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

    return (
        <div className='text-center space-y-3 space-x-3'>
            <Router>
                <Switch>
                    <Route path='/history/select'>
                        <p className='text-2xl font-semibold'>Select historical range</p>
                        <span>From date</span>
                        <input type='date' onChange={e => {
                            setStarto(e.target.value)
                            console.log(e.target.value)
                        }}></input>
                        <span>To date</span>
                        <input type='date' onChange={e => {
                            setEndo(e.target.value)
                            console.log(e.target.value)
                        }}></input>
                        <br />
                        <br />
                        <Link to='/history/result'><button onClick={allFilledOrNot}>Get data</button></Link>
                    </Route>
                    <Route path='/history/result'>
                        {render()}
                    </Route>
                </Switch>
            </Router>

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


//prototype codes here

// const resp = await axios.get<Object | null>(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${query.get(starto)}&end=${query.get(endo)}`)


// else {
    //     let extractedData = []
    //     console.log(histData?.bpi)

    //     return (
    //         <li className='text-xl'>kek - {(0).toLocaleString()} THB</li>   //wip
    //     )
    // }

