import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { APIURL } from '../config'

export default function EntryDetail({ match }) {
    const [deleted, setDeleted] = useState(false)
    const [error, setError] = useState(false)
    const [entry, setEntry] = useState(null)
    useEffect(() => {
        const url = `${APIURL}/entries/${match.params.id}`
        fetch(url)
            .then(response => response.json())
            .then(data => setEntry(data))
            .catch(() => {
                setError(true)
            })
    }, [match.params.id])

    if (deleted) {
        return <Redirect to="/entries"></Redirect>
    }

    if (error) {
        return (
            <div><h2>Sorry, something went wrong.</h2></div>
        )
    }

    if (!entry) {
        return (
            <div>
                <h3>Loading, please wait...</h3>
            </div>
        )
    }

    return (
        <div className="entry-card">
            <img src={entry.img} />
            <h1>{entry.title}</h1>
            <p>{entry.description}</p>
            <Link to="#">edit</Link>
            <Link to="#">delete</Link>
        </div>
    )
}