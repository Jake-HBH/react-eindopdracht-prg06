import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function JokesList() {
    const [jokes, setJokes] = useState(null);

    useEffect(() => {
        async function fetchJokes() {
            try {
                const response = await fetch('http://145.24.223.74:8010/jokes', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                });
                const data = await response.json();
                setJokes(data.items);
            } catch (error) {
                console.error('Error fetching jokes:', error);
            }
        }
        fetchJokes();
    }, []);

    return (
        <div id="root">
            {!jokes ? (
                <p className="text-center text-xl text-primary">Loading jokes...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jokes.map((joke, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-xl p-6 flex flex-col h-full hover:shadow-xl transition-all">
                            <h2 className="text-2xl font-bold text-primary">{joke.title}</h2>
                            <p className="mt-3 text-sm text-gray-500"><strong>Author:</strong> {joke.author}</p>
                            <div className="mt-auto flex justify-center">
                                <Link to={`/jokes/${joke.id}`} className="w-full">
                                    <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary focus:outline-none transform transition duration-300 hover:scale-110 hover:shadow-button active:scale-95">
                                        View Joke
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default JokesList;
