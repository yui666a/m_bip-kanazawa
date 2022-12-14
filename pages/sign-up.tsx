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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const params = {
      mode: "sign-up",
      name: data.get("name"),
      // belong: data.get("name"),
      // self_introduce: data.get("name"),
      userId: data.get("user_id"),
      isStudent: data.get("isStudent"),
      email: data.get("email"),
      password: data.get("password"),
    };
    axios.get(baseUrl, { params: params }).then((res: any) => {
      res.data.id && params.isStudent
        ? Router.push("/student")
        : Router.push("/company");
    });
  };

  const baseUrl =
    "https://script.google.com/macros/s/AKfycbyqG7KOoehDPDq9uI1eHzGKiZmX00AW1EG0sc3wnhKruNTKi9B2r19p08KBu5imfFl2hw/exec";

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
          ?????????????????????
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* <Grid item xs={12} sm={6}> */}
              <TextField
                autoComplete="??????"
                required
                fullWidth
                name="name"
                id="name"
                label="??????"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="user_id"
                label="USER ID"
                name="user_id"
                autoComplete="ID"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email ????????????"
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
              <RadioGroup
                aria-labelledby="aaa"
                defaultValue="??????"
                name="isStudent"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="??????"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="??????"
                />
              </RadioGroup>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="?????????????????????"
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={createAccount}
          >
            ????????????
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              ????????????????????????????????????????????????
              <Link href="/login" variant="body2">
                ????????????
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  );
}
