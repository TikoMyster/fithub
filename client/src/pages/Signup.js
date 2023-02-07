import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../utils/mutations";
import AlertComponent from "../components/Alert";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Auth from "../utils/auth";

export default function Signup() {
  const [showAlert, setShowAlert] = useState(false);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = formState;
  // get the signup mutation function from useMutation
  const [signup] = useMutation(SIGNUP);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signup({
        variables: {
          username,
          email,
          password,
        },
      });
      // get the token from the response and save to localStorage
      const token = response.data.signup.token;
      Auth.login(token);
    } catch (err) {
      setShowAlert(true);
    }
  };

  return (
    <main
      style={{
        height: "90vh",
        backgroundImage: "url(/assets/bg-body.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "scroll",
      }}
    >
      <Sheet
        sx={{
          width: 300,
          mx: "auto", // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
          position: "relative",
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Create a new account</b>
          </Typography>
        </div>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            // html input attribute
            name="username"
            type="username"
            placeholder="testuser"
            value={username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            // html input attribute
            name="email"
            type="email"
            placeholder="test@email.com"
            value={email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            // html input attribute
            name="password"
            type="password"
            placeholder="should have 6+ characters"
            value={password}
            onChange={handleChange}
          />
        </FormControl>

        <Button sx={{ mt: 1 /* margin top */ }} onClick={handleSubmit}>
          Sign up
        </Button>
        <Typography
          endDecorator={<Link href="/login">Log in</Link>}
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          Already have an account?
        </Typography>
      </Sheet>
      {showAlert && <AlertComponent setShowAlert={setShowAlert} />}
    </main>
  );
}
