import type { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Image from "next/image";
import KeyVisual from "/public/keyvisual_m.jpg";
import { AppBar, Hidden } from "@mui/material";

const onClickGuestLogin = () => {
  localStorage.setItem("id", "5");
  localStorage.setItem("userId", "guest");
  Router.push("/student");
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>カイドク</title>
        <meta
          name="description"
          content="イノベーションを起こすならば　カイドク！"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
      // lassName={styles.container}
      >
        {/* <header className={styles.title}>
          <AppBar position="static">
            <span>カイドク！</span>
          </AppBar>
        </header> */}
        {/* <main className={styles.main}> */}
        {/* <h1 className={styles.title}>
            イノベーションを起こすならば
            <br />
            カイドク！
          </h1> */}
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: "-100",
            overflow: "hidden",
          }}
        >
          <Image
            src={KeyVisual}
            alt="keyvisual"
            style={{
              height: "100vh",
              width: "100vw",
              overflow: "hidden",
            }}
          />
        </div>

        <Grid container>
          <Grid item xs={12} md={8}>
            <h1 className={styles.title}>
              イノベーションを起こすなら
              <br />
              カイドク！
            </h1>
          </Grid>
          <Grid item xs={12} md={4}>
          <div
            style={{
              height: "100vh",
              background: "rgba(255,255,255,0.8)",
              padding: "1rem 2rem",
              fontSize: "1.5rem",
            }}
          >
            <p style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                startIcon={<WorkIcon />}
                endIcon={<StorefrontIcon />}
                onClick={() => Router.push("/company")}
                fullWidth
                style={{ fontSize: "1.6rem" }}
              >
                企業の方はこちら
              </Button>
            </p>
            <p style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                startIcon={<SchoolIcon />}
                onClick={() => Router.push("/student")}
                fullWidth
                style={{ fontSize: "1.6rem" }}
              >
                学生の方はこちら
              </Button>
            </p>
            <p style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                startIcon={<SchoolIcon />}
                onClick={() => onClickGuestLogin()}
                fullWidth
                style={{ fontSize: "1.6rem" }}
              >
                ゲストの方はこちら
              </Button>
            </p>
            <p style={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                endIcon={<LoginIcon />}
                onClick={() => Router.push("/login")}
                fullWidth
                style={{ fontSize: "1.6rem" }}
              >
                ログイン
              </Button>
            </p>
            <p style={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                endIcon={<PersonAddAltIcon />}
                onClick={() => Router.push("/sign-up")}
                fullWidth
                style={{ fontSize: "1.6rem" }}
              >
                新規登録
              </Button>
            </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
