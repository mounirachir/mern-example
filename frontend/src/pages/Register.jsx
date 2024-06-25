import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("passwords do not match");
    } else {
      dispatch(register({ name, email, password }));
    }
  };
  useEffect(() => {
    if (isError) {
      const messages = message.split("\n");
      messages.forEach((message) => toast.error(message));
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [message, isError, isSuccess, user, dispatch, navigate]);
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    !user && (
      <FormContainer>
        <h1 className="text-center mb-5">
          Account <span className="text-primary">Register</span>
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="name">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-4" controlId="email">
            <Form.Label>Email Address :</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-4" controlId="confirmPassword">
            <Form.Label>Confirm Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Sign Up
          </Button>
          <Row className="py-3">
            <Col>
              Already have an account ? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    )
  );
};

export default Register;
