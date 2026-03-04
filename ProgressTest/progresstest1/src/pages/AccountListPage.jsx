import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AccountListPage() {
    const [accounts, setAccounts] = useState([]);
    const { state, dispatch } = useContext(AuthContext);
    console.log("FULL STATE:", state);
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.isAuthenticated) {
            navigate("/");
        } else {
            fetchAccounts();
        }
    }, [state.isAuthenticated, navigate]);

    const fetchAccounts = async () => {
        try {
            const res = await axios.get("http://localhost:3001/accounts");
            setAccounts(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleStatus = async (account) => {
        const newStatus = account.status === "active" ? "locked" : "active";

        await axios.patch(`http://localhost:3001/accounts/${account.id}`, {
            status: newStatus,
        });

        setAccounts(
            accounts.map((acc) =>
                acc.id === account.id ? { ...acc, status: newStatus } : acc
            )
        );
    };

    return (
        <Container className="mt-5">
            <h2>Account List</h2>
            <Button
                variant="danger"
                className="mb-3"
                onClick={() => {
                    dispatch({ type: "LOGOUT" });
                    navigate("/");
                }}
            >
                Logout
            </Button>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((acc) => (
                        <tr key={acc.id}>
                            <td>
                                <img
                                    src={`/images/users/${acc.avatar}`}
                                    alt={acc.username}
                                    width="50"
                                    height="50"
                                    style={{ borderRadius: "50%", objectFit: "cover" }}
                                />
                            </td>
                            <td>{acc.username}</td>
                            <td>{acc.email}</td>
                            <td>
                                <span
                                    className={
                                        acc.role === "admin"
                                            ? "text-danger fw-bold"
                                            : "text-primary fw-bold"
                                    }
                                >
                                    {acc.role}
                                </span>
                            </td>
                            <td>
                                <span
                                    className={
                                        acc.status === "active"
                                            ? "text-success fw-bold"
                                            : "text-secondary fw-bold"
                                    }
                                >
                                    {acc.status}
                                </span>
                            </td>
                            <td className="d-flex gap-2">

                                <Button
                                    variant="info"
                                    onClick={() => navigate(`/accounts/${acc.id}`)}
                                >
                                    View Details
                                </Button>

                                {state.user?.id !== acc.id && (
                                    <Button
                                        variant={acc.status === "active" ? "warning" : "success"}
                                        onClick={() => handleToggleStatus(acc)}
                                    >
                                        {acc.status === "active" ? "Lock" : "Unlock"}
                                    </Button>
                                )}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default AccountListPage;