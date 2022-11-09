import type { NextPage } from "next";
import { useRouter } from "next/router";

import Router from "next/router";
import Head from "next/head";
import styles from "/styles/Home.module.css";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useEffect, useState } from "react";
import { Input, TextField, Typography } from "@mui/material";
import Image from "next/image";

type JobOffer = {
  logo: any;
  id: number;
  category: string;
  title: string;
  detail: string;
};

const Student: NextPage = () => {
  const router = useRouter();
  const { task_id } = router.query;
  const [items, setItems] = useState([1, 2, 3]);

  useEffect(() => {
    console.log("useEffect");
  }, []);

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
      <header className={styles.title}>
        <AppBar position="static">企業求人追加ページ。ここはヘッダー</AppBar>
      </header>
      <main className={styles.main}>
        <Typography>task.name</Typography>
        パスパラメータは{task_id}です。id{task_id}のデータを取得してきて表示する
        {items &&
          items.map((item: any) => {
            return (
              <Card
                variant="outlined"
                sx={{ width: "100%", margin: "5px" }}
                key={item.id}
              >
                <CardContent>
                  Aさんの案
                  {/* <Image>{item.logo}</Image> */}
                  <Typography>item.title{item.title}</Typography>
                  <Typography>item.detail{item.detail}</Typography>
                </CardContent>
              </Card>
            );
          })}
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

export default Student;
