import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function CreateJoke() {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
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
            }
        } catch (error) {
        }
    };

    return (
        <div id="root">
            <div className="form-container">
                <h2>Post a joke</h2>
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
                    <button type="submit" className="btn-submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateJoke;
