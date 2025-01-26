import React, { useState, useEffect } from "react";
import { Link } from "react-router";

function JokesList() {
    const [jokes, setNotes] = useState(null);

    useEffect(() => {
        async function fetchNotes() {
            try {
                const response = await fetch('http://145.24.223.74:8010/jokes', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                });
                const data = await response.json();
                setNotes(data.items);
            } catch (error) {
            }
        }
        fetchNotes();
    }, []);

    return (
        <div id="root">
            {!jokes ? (
                <p>Loading jokes...</p>
            ) : (
                <div className="jokes-container">
                    {jokes.map((joke, index) => (
                        <div key={index} className="card">
                            <h2>{joke.title}</h2>
                            <p>{joke.body}</p>
                            <p><strong>Author:</strong> {joke.author}</p>
                            <Link to={`/jokes/${joke.id}`}>
                                <button className="detail-button">View Detail</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default JokesList;
