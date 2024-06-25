import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark" expand="md">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>my app</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <Button variant="primary" onClick={() => dispatch(logout())}>
                  <FaSignOutAlt /> sign out
                </Button>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt />
                      <span className="mx-2">sign in</span>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaUser />
                      <span className="mx-2">sign up</span>
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
