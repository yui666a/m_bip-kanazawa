import { useState } from "react";
import Router from "next/router";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

// const theme = createTheme();

export default function SignUp() {
  const [inputState, setState] = useState({
    name: "aaa",
    isStudent: true,
    password: "eee",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    axios
      .get(baseUrl, {
        params: {
          mode: "sign-up",
          ...inputState,
        },
      })
      .then((res: any) => {
        console.log(res);
        // if (res.data === "password incorrect")
        //   setState({ ...inputState, password: "" });
        // if (res.data === "user not fount") setState({ id: "", password: "" });

        // res.data.isStudent ? Router.push("/student") : Router.push("/company");
      });
  };

  const baseUrl =
    "https://script.google.com/macros/s/AKfycbyqG7KOoehDPDq9uI1eHzGKiZmX00AW1EG0sc3wnhKruNTKi9B2r19p08KBu5imfFl2hw/exec";
  function createAccount() {
    axios
      .get(baseUrl, {
        params: {
          mode: "sing-up",
          name: "aaa",
          belong: "bbb",
          self_introduce: "ccc",
          isStudent: true,
          password: "eee",
        },
      })
      .then((res: any) => {
        console.log(res);
        // if (res.data === "password incorrect")
        //   setState({ ...inputState, password: "" });
        // if (res.data === "user not fount") setState({ id: "", password: "" });

        // res.data.isStudent ? Router.push("/student") : Router.push("/company");
      });
  }

  return (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          新規ユーザ登録
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                name="氏名（姓）"
                id="氏名（姓）"
                label="氏名（姓）"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="氏名（名）"
                label="氏名（名）"
                name="氏名（名）"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email アドレス"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="規約に同意する"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={createAccount}
          >
            登録する
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              すでにアカウントをお持ちですか？
              <Link href="/login" variant="body2">
                ログイン
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  );
}
