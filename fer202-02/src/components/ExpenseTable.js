import { useEffect, useState } from "react";
import api from "../services/api";

export default function ExpenseTable({ setEditingExpense }) {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    const res = await api.get("/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/expenses/${id}`);
    loadExpenses();
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  return (
    <div>
      <h4>Expense Management</h4>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{Number(item.amount).toLocaleString()} đ</td>
              <td>{item.category}</td>
              <td>{item.date}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}