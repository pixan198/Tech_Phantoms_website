import Airtable from 'airtable'
import { useState, useEffect } from 'react'

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_TEAM_BASE)



const useTeam = tableName => {
    const [data, setData] = useState([])

    const getData = async tableName => {
        base(tableName).select({
            view: "Grid view"
        }).firstPage().then(result => {
            setData(result.map(el => el.fields))
        }).catch(err => {
            throw err
        })
    }

    useEffect(() => {
        getData(tableName)
    }, [])

    return data
}

export default { useTeam }