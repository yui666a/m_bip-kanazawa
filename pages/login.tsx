import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";

export default function App() {
  return (
    <CssVarsProvider>
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
          <TextField name="id" type="id" label="ID" placeholder="ID" />
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="パスワード"
          />
          <Button sx={{ mt: 1 /* margin top */ }}>Log in</Button>
          <Typography
            endDecorator={<Link href="/sign-up">登録</Link>}
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            ユーザ登録がお済みでない方は
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
