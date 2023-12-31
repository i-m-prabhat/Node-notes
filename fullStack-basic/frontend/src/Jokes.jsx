import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Jokes = () =>
{
    const [jokes, setJokes] = useState([]);

    useEffect(() =>
    {
        axios.get('/api/jokes')
            .then(response => setJokes(response.data))
            .catch(error => console.error('Error fetching jokes:', error));
    }, []);

    return (
        <div>
            <h2>Jokes</h2>
            <ul>
                {jokes.map((joke, index) => (
                    <li key={index}>
                        <div>
                            <strong>Question:</strong> {joke.question}
                        </div>
                        <div>
                            <strong>Answer:</strong> {joke.answer}
                        </div>
                        <div>
                            <em>Author: {joke.author}</em>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Jokes;
