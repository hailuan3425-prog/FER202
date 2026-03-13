import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function TotalExpense() {

  const [total, setTotal] = useState(0);

  const loadTotal = async () => {
    const res = await api.get("/expenses");

    const sum = res.data.reduce(
      (acc, item) => acc + Number(item.amount),
      0
    );

    setTotal(sum);
  };

  useEffect(() => {
    loadTotal();
  }, []);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Total of Expenses</Card.Title>
        <h4>{total.toLocaleString()} đ</h4>
      </Card.Body>
    </Card>
  );
}