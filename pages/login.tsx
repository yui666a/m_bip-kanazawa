// import { CssVarsProvider } from "@mui/joy/styles";
import { useState } from "react";
import Router from "next/router";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/joy/Link";
import axios from "axios";

export default function App() {
  const [inputState, setState] = useState({
    id: "",
    password: "",
  });

  const baseUrl =
    "https://script.google.com/macros/s/AKfycbyqG7KOoehDPDq9uI1eHzGKiZmX00AW1EG0sc3wnhKruNTKi9B2r19p08KBu5imfFl2hw/exec";
  function tryLogin() {
    axios
      .get(baseUrl, {
        params: {
          mode: "login",
          id: inputState.id,
          password: inputState.password,
        },
      })
      .then((res: any) => {
        if (res.data === "password incorrect")
          setState({ ...inputState, password: "" });
        if (res.data === "user not fount") setState({ id: "", password: "" });
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("userId", res.data.userId);
        res.data.isStudent ? Router.push("/student") : Router.push("/company");
      });
  }

  return (
    // <CssVarsProvider>
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
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>ログイン</b>
          </Typography>
        </div>
        <TextField
          name="id"
          type="id"
          label="ID"
          placeholder="ID"
          value={inputState.id}
          onChange={(e) => setState({ ...inputState, id: e.target.value })}
        />
        <TextField
          name="password"
          type="password"
          placeholder="password"
          label="パスワード"
          value={inputState.password}
          onChange={(e) =>
            setState({ ...inputState, password: e.target.value })
          }
        />
        <Button
          sx={{ mt: 1 /* margin top */ }}
          variant="contained"
          onClick={() => tryLogin()}
        >
          Log in
        </Button>
        <Typography
          endDecorator={<Link href="/sign-up">登録</Link>}
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          ユーザ登録がお済みでない方は
        </Typography>
      </Sheet>
    </main>
    // </CssVarsProvider>
  );
}
