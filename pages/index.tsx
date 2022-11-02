import type { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>カイドク</title>
        <meta
          name="description"
          content="イノベーションを起こすならば　カイドク！"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          イノベーションを起こすならば
          <br />
          カイドク！
        </h1>

        <Button
          variant="contained"
          startIcon={<WorkIcon />}
          endIcon={<StorefrontIcon />}
          onClick={() => Router.push("/company")}
        >
          企業の方はこちら
        </Button>
        <Button
          variant="contained"
          startIcon={<SchoolIcon />}
          onClick={() => Router.push("/student")}
        >
          学生の方はこちら
        </Button>
        <Button
          variant="outlined"
          endIcon={<LoginIcon />}
          onClick={() => Router.push("/login")}
        >
          ログイン
        </Button>
        <Button
          variant="outlined"
          endIcon={<PersonAddAltIcon />}
          onClick={() => Router.push("/sign-up")}
        >
          新規登録
        </Button>
      </main>

      <footer className={styles.footer}>
        <a
          // TODO: ここを修正する。
          href="https://www.nagaokaut.ac.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by NAKAJIMA, Keita
        </a>
      </footer>
    </div>
  );
};

export default Home;
