import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const MovieForm = ({ onSubmit }) => {
    const [movie, setMovie] = useState({
        title: "",
        year: "",
        duration: "",
        genre: ""
    });

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...movie,
            year: parseInt(movie.year),
            duration: parseInt(movie.duration)
        });
        setMovie({ title: "", year: "", duration: "", genre: "" });
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Control
                className="mb-2"
                placeholder="Title"
                name="title"
                value={movie.title}
                onChange={handleChange}
                required
            />
            <Form.Control
                className="mb-2"
                type="number"
                placeholder="Year"
                name="year"
                value={movie.year}
                onChange={handleChange}
                required
            />
            <InputGroup className="mb-2">
                <Form.Control
                    type="number"
                    placeholder="Duration"
                    name="duration"
                    value={movie.duration}
                    onChange={handleChange}
                    required
                />
                <InputGroup.Text>minutes</InputGroup.Text>
            </InputGroup>
            <Form.Control
                className="mb-2"
                placeholder="Genre"
                name="genre"
                value={movie.genre}
                onChange={handleChange}
                required
            />
            <Button type="submit">Add Movie</Button>
        </Form>
    );
};

export default MovieForm;