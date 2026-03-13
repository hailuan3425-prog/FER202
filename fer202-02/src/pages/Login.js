import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    if(!username || !password){
      setError("Username and password are required");
      return;
    }

    const res = await api.get("/users");

    const user = res.data.find(
      u => u.username === username && u.password === password
    );

    if(user){
      localStorage.setItem("user",JSON.stringify(user));
      navigate("/home");
    }else{
      setError("Invalid account");
    }

  };

  return (

    <Container style={{maxWidth:400,marginTop:100}}>

      <h3>Login</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleLogin}>

        <Form.Control
          className="mb-3"
          placeholder="Username"
          onChange={e=>setUsername(e.target.value)}
        />

        <Form.Control
          className="mb-3"
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <Button type="submit">Login</Button>

      </Form>

    </Container>

  );
}