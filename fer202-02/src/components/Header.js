import { Navbar, Container, Button } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>

        <Navbar.Brand>PersonalBudget</Navbar.Brand>

        <div className="text-white">
          Signed in as Nguyễn Văn Anh
          <Button variant="outline-light" size="sm" className="ms-2">
            Logout
          </Button>
        </div>

      </Container>
    </Navbar>
  );
}