import React from 'react';
import { useNavigate } from 'react-router';

function DeleteNoteButton({ noteId }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this joke?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://145.24.223.74:8010/jokes/${noteId}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (response.ok) {
                    navigate('/');
                } else {
                }
            } catch (error) {
            }
        }
    };

    return (
        <button className="btn-delete" onClick={handleDelete}>
            Delete Note
        </button>
    );
}

export default DeleteNoteButton;
