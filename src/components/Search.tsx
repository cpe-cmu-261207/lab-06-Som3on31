import { BrowserRouter as Router, Switch, Link, Route, useLocation, useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { object } from 'prop-types'
import Result from './Result'


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

   




    return (
        <div className='text-center space-y-3 space-x-3'>
            <Router>
                <Switch>
                    <Route path='/history/select'>
                        <p className='text-2xl font-semibold'>Select historical range</p>
                        <span>From date</span>
                        <input type='date' onChange={e => setStarto(e.target.value)} id='before'></input>
                        <span>To date</span>
                        <input type='date' onChange={e => setEndo(e.target.value)} id='after'></input>
                        <br />
                        <Link to='/history/result'><button>Get data</button></Link>
                    </Route>
                    <Route path='/history/result'>
                        <Result/>
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


// const fillData = () => {
//     let switchPlace = Date.parse(starto) < Date.parse(endo) //I had to make this or I cannot read it just like the later line below
//     let isEmpty: boolean = starto === '' || endo === ''
//     // let history = useHistory()

//     if (switchPlace || isEmpty) {
//         alert('Please select start date and end date correctly.')
//         // history.push('/history/select')
//     }
//     else {
//         let extractedData = []
//         console.log(histData?.bpi)
//         // for (const [key, value] of Object.entries(histData?.bpi)) {

//         // }
//         return (
//             <li className='text-xl'>kek - {(0).toLocaleString()} THB</li>   //wip
//         )
//     }
// }