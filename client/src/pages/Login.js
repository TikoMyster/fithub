import React, { useState } from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { LOGIN } from "../utils/mutations";

export default function Login() {
  // declare form state
  const [formState, setFormState] = useState({ email: "", password: "" });
  // destructure two variables
  const { email, password } = formState;
  // get the login mutaion function
  const [login] = useMutation(LOGIN);
  // handle form input field change
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // handle form submit, create a token and save to localStorage
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login({
      variables: {
        email,
        password,
      },
    });
    const token = response.data.login.token;
    Auth.login(token);
  };

  return (
    <main>
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
            <b>Welcome!</b>
          </Typography>
          <Typography level="body2">Sign in to continue.</Typography>
        </div>
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
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
        </FormControl>

        <Button sx={{ mt: 1 /* margin top */ }} onClick={handleSubmit}>
          Log in
        </Button>
        <Typography
          endDecorator={<Link href="/signup">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </main>
  );
}
