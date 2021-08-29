import { BrowserRouter as Router, Switch, Link, Route, useLocation, useHistory } from 'react-router-dom'

interface HD{
    data?: Object; start?: string; end?: string; loading?: boolean; err?: boolean
}


const History = (data: Object, start: string, end: string, loading: boolean, err: boolean) => {

    //not working
    const render = () => {

        if (loading) {
            // console.log(data?.bpi)
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-2xl'>Loading ...</p>
                </div>
            )
        } else if (!err) {
            // console.log(data?.bpi)
            return (
                <div>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-xl font-semibold'> From {start} To {end}</p>
                    {data}
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
        <div>
            {render()}
        </div>
    )
}


export default History

//not in-use code here

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
    //         // console.log(histData?.bpi)
    //         // for (const [key, value] of Object.entries(histData?.bpi)) {

    //         // }
    //         return (
    //             <li className='text-xl'>kek - {(0).toLocaleString()} THB</li>   //wip
    //         )
    //     }
    // }