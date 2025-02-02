import React from 'react';
import { useNavigate } from 'react-router';

function DeleteJokeButton({ jokeId }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this joke?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://145.24.223.74:8010/jokes/${jokeId}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (response.ok) {
                    navigate('/');
                }
            } catch (error) {
            }
        }
    };

    return (
        <button className="btn-delete" onClick={handleDelete}>
            Delete Joke
        </button>
    );
}

export default DeleteJokeButton;
