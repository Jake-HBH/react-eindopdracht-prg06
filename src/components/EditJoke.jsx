import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

function EditJoke() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        author: '',
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJoke = async () => {
            try {
                const response = await fetch(`http://145.24.223.74:8010/jokes/${id}`, {
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch joke');
                }

                const joke = await response.json();
                setFormData({
                    title: joke.title,
                    body: joke.body,
                    author: joke.author,
                });
            } catch (error) {
                setError(true);
                setErrorMessage('Failed to fetch joke details. Please try again later.');
            }
        };

        fetchJoke();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://145.24.223.74:8010/jokes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate(`/jokes/${id}`);
            } else {
                const errorData = await response.json();
                setError(true);
                setErrorMessage(errorData.error || 'Failed to update joke.');
            }
        } catch (error) {
            setError(true);
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div id="root">
            <div className="form-container">
                <h2>Edit Joke</h2>
                {error && (
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Description:</label>
                        <textarea
                            id="body"
                            name="body"
                            value={formData.body}
                            onChange={handleInputChange}
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author:</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn-submit">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditJoke;
