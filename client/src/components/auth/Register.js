import { useState } from "react";
import { register } from "../../managers/authManager";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";

export default function Register({ setLoggedInUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMismatch, setPasswordMismatch] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      const newUser = {
        firstName,
        lastName,
        email,
        password
      };
      register(newUser).then((user) => {
        setLoggedInUser(user);
        navigate("/");
      });
    }
  };

  return (
    <div className="container" style={{ 
      maxWidth: "500px",
      marginTop: "25px" }}>
      <h1>Sign Up</h1>
      <FormGroup>
        <Label style={{fontSize: "larger"}}>First Name</Label>
        <Input
          type="text"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          style={{
            fontSize: "larger",
            borderRadius: 0,
            border: "1px solid #021E36"
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label style={{fontSize: "larger"}}>Last Name</Label>
        <Input
          type="text"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          style={{
            fontSize: "larger",
            borderRadius: 0,
            border: "1px solid #021E36"
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label style={{fontSize: "larger"}}>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={{
            fontSize: "larger",
            borderRadius: 0,
            border: "1px solid #021E36"
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label style={{fontSize: "larger"}}>Password</Label>
        <Input
          invalid={passwordMismatch}
          type="password"
          value={password}
          onChange={(e) => {
            setPasswordMismatch(false);
            setPassword(e.target.value);
          }}
          style={{
            fontSize: "larger",
            borderRadius: 0,
            border: "1px solid #021E36"
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label style={{fontSize: "larger"}}> Confirm Password</Label>
        <Input
          invalid={passwordMismatch}
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setPasswordMismatch(false);
            setConfirmPassword(e.target.value);
          }}
          style={{
            fontSize: "larger",
            borderRadius: 0,
            border: "1px solid #021E36"
          }}
        />
        <FormFeedback>Passwords do not match!</FormFeedback>
      </FormGroup>
      <Button
        color="primary"
        onClick={handleSubmit}
        disabled={passwordMismatch}
        className="button" style={{
          backgroundColor: "#75BCFA",
          color: "#021E36",
          fontWeight: 800,
          border: "none",
          borderRadius: "0px",
          transition: "box-shadow 0.1s",
          fontSize: "larger"
          }}
      >
        Register
      </Button>
      <p>
        Already signed up? Log in <Link to="/login">here</Link>
      </p>
    </div>
  );
}
