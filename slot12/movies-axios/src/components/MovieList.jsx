import React from "react";
import { Table, Button } from "react-bootstrap";

const MovieList = ({ movies, onDelete }) => {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Year</th>
          <th>Duration (minutes)</th>
          <th>Genre</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((m) => (
          <tr key={m.id}>
            <td>{m.id}</td>
            <td>{m.title}</td>
            <td>{m.year}</td>
            <td>{m.duration}</td>
            <td>{m.genre}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(m.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MovieList;