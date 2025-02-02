import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function CreateJoke() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author: ''
    });

    const navigate = useNavigate();

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
            const response = await fetch('http://145.24.223.74:8010/jokes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error("Failed to post the joke");
            }
        } catch (error) {
            console.error("Error submitting joke:", error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-background text-text">
            <div className="bg-white shadow-card rounded-xl p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-primary mb-4">Post a Joke</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="title" className="block mb-1 text-sm text-gray-700">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="description" className="block mb-1 text-sm text-gray-700">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        ></textarea>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="author" className="block mb-1 text-sm text-gray-700">Author:</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateJoke;
