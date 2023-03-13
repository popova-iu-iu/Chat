import { Outlet } from "react-router-dom";
import { Navbar, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../hooks";

const Layout = () => {
  const { logOut, user } = useAuth();

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-black text-decoration-none">
              Hexlet Chat
            </Link>
          </Navbar.Brand>
          {user && <Button onClick={logOut}>Войти в айти выйти в окно</Button>}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
