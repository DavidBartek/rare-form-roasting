import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../managers/authManager";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";

export default function Login({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then((user) => {
      if (!user) {
        setFailedLogin(true);
      } else {
        setLoggedInUser(user);
        navigate("/");
      }
    });
  };

  return loggedInUser ? <Navigate to="/" /> : ( // if manually typed in, user will automatically be redirected to home if already logged in.
    <div className="container" style={{ 
        maxWidth: "500px",
        marginTop: "25px" 
    }}>
      <h1>Login</h1>
      <h5>(to place orders, see order history, etc.)</h5>
      <FormGroup>
        <Label>Email</Label>
        <Input
          invalid={failedLogin}
          type="text"
          value={email}
          onChange={(e) => {
            setFailedLogin(false);
            setEmail(e.target.value);
          }}
          style={{
            borderRadius: 0,
            border: "1px solid #021E36"
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          invalid={failedLogin}
          type="password"
          value={password}
          onChange={(e) => {
            setFailedLogin(false);
            setPassword(e.target.value);
          }}
          style={{
            borderRadius: 0,
            border: "1px solid #021E36"
          }}
        />
        <FormFeedback>Login failed.</FormFeedback>
      </FormGroup>

      <Button onClick={handleSubmit} className="button" style={{
        backgroundColor: "#75BCFA",
        color: "#021E36",
        fontWeight: 800,
        border: "none",
        borderRadius: "0px",
        transition: "box-shadow 0.1s"
        }}>
        Login
      </Button>
      <p>
        Not signed up? Register <Link to="/register">here</Link>
      </p>
    </div>
  );
  
}
