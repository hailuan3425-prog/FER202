import { Link } from 'react-router-dom';

function MainNav() {
  return (
    <nav style={{ marginBottom: 20 }}>
      <Link to="/">Quantity</Link> |{" "}
      <Link to="/order">Order</Link> |{" "}
      <Link to="/product">Product</Link> |{" "}
      <Link to="/todo">Todo</Link>
    </nav>
  );
}

export default MainNav;
