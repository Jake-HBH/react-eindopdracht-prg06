import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

function EditJoke() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
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

                const joke = await response.json();
                setFormData({
                    title: joke.title,
                    description: joke.description,
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
        <div id="root" className="flex justify-center p-8">
            <div className="bg-white shadow-card rounded-xl p-8 w-full sm:w-3/4 md:w-1/2">
                <h2 className="text-3xl font-bold text-primary mb-6">Edit Joke</h2>
                {error && <p className="text-red-500 text-lg">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full mt-2 p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-lg font-semibold text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full mt-2 p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="author" className="block text-lg font-semibold text-gray-700">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            className="w-full mt-2 p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary focus:outline-none transition-all transform hover:scale-105 hover:shadow-button active:scale-95"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditJoke;
