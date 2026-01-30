import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

function TodoList() {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setList([...list, task]);
      setTask('');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Todo List</h2>

      <Form className="d-flex mb-3">
        <Form.Control
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button onClick={addTask} className="ms-2">
          Add
        </Button>
      </Form>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <Button
              variant="danger"
              size="sm"
              className="ms-2"
              onClick={() =>
                setList(list.filter((_, i) => i !== index))
              }
            >
              X
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default TodoList;
