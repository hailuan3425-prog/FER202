import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

import TotalExpense from "../components/TotalExpense";
import EditExpense from "../components/EditExpense";
import Filter from "../components/Filter";
import ExpenseTable from "../components/ExpenseTable";

export default function Home() {

  const [editingExpense, setEditingExpense] = useState(null);

  return (
    <Container className="mt-4">

      <Row>
        {/* LEFT SIDE */}
        <Col md={4}>
          <TotalExpense />
          <EditExpense
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />
        </Col>

        {/* RIGHT SIDE */}
        <Col md={8}>
          <Filter />
          <ExpenseTable
            setEditingExpense={setEditingExpense}
          />
        </Col>
      </Row>

    </Container>
  );
}