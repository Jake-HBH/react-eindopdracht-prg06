import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import DeleteNoteButton from "./DeleteJoke.jsx";

function JokeDetail() {
    const { id } = useParams();
    const [joke, setNote] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchNote() {
            try {
                const response = await fetch(`http://145.24.223.74:8010/jokes/${id}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch joke details: ${response.status}`);
                }

                const data = await response.json();
                setNote(data);
            } catch (error) {
                setError(true);
            }
        }

        fetchNote();
    }, [id]);

    return (
        <div>
            {error ? (
                <p>Error fetching joke details. Please try again later.</p>
            ) : joke ? (
                <div>
                    <h1>{joke.title}</h1>
                    <p>{joke.body}</p>
                    <p><strong>Author:</strong> {joke.author}</p>
                    <div>
                        <Link to={`/jokes/${id}/edit`}>
                            <button>Edit Note</button>
                        </Link>
                        <DeleteNoteButton noteId={id} /> {/* Add the delete button here */}
                    </div>
                </div>
            ) : (
                <p>Loading joke...</p>
            )}
        </div>
    );
}

export default JokeDetail;
