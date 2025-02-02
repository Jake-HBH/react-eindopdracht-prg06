import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteJokeButton from "./DeleteJoke";

function JokeDetail() {
    const { id } = useParams();
    const [joke, setJoke] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchJoke() {
            try {
                const response = await fetch(`http://145.24.223.74:8010/jokes/${id}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                });

                const data = await response.json();
                setJoke(data);

            } catch (error) {
                setError(true);
            }
        }

        fetchJoke();
    }, [id]);

    return (
        <div id="root" className="flex justify-center p-8">
            <div className="bg-white shadow-card rounded-xl p-8 w-full sm:w-3/4 md:w-1/2">
                {error ? (
                    <p className="text-red-500">Error fetching joke details. Press <a href={"/"} className="text-primary underline">here</a> to go back to the homescreen.

                    </p>
                ) : joke ? (
                    <div>
                        <h1 className="text-3xl font-bold text-primary mb-4">{joke.title}</h1>
                        <p className="text-lg text-gray-700 mb-4">{joke.description}</p>
                        <p className="text-sm text-gray-500 mb-4"><strong>Author:</strong> {joke.author}</p>

                        <div className="flex gap-4 mt-6 justify-center">
                            <Link to={`/jokes/${id}/edit`}>
                                <button className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary focus:outline-none transition-all transform hover:scale-105 hover:shadow-button active:scale-95">
                                    Edit Joke
                                </button>
                            </Link>
                            <DeleteJokeButton jokeId={id} />
                        </div>
                    </div>
                ) : (
                    <p className="text-xl text-primary">Loading joke...</p>
                )}
            </div>
        </div>
    );
}

export default JokeDetail;
