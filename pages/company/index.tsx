import type { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
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
import { Typography } from "@mui/material";
import Image from "next/image";

// company my page

type JobOffer = {
  logo: any;
  id: number;
  category: string;
  title: string;
  detail: string;
  reward: number;
};

const Company: NextPage = () => {
  const sampleItems: JobOffer[] = [
    {
      id: 1,
      logo: "",
      category: "AAA",
      title: "aaaaa",
      detail: "this is detail",
      reward: 3000000,
    },
    {
      id: 2,
      logo: "",
      category: "BBB",
      title: "bbbbbbb",
      detail: "this is detail",
      reward: 4000000,
    },
    {
      id: 3,
      logo: "",
      category: "CCC",
      title: "cccccccc",
      detail: "this is detail",
      reward: 5000000,
    },
  ];

  // TODO: 一時的にサンプルデータを挿入。APIから取得するようになったら、コメントアウトを外す
  // const [items, setItems] = useState<JobOffer[]>([]);
  const [items, setItems] = useState<JobOffer[]>(sampleItems);

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
        <AppBar position="static">Company My Page</AppBar>
      </header>

      <main className={styles.main}>


        <Button
          variant="contained"
          // startIcon={<WorkIcon />}
          // endIcon={<StorefrontIcon />}
          onClick={() => Router.push("add.tsx")}
        >
          新しく質問する
        </Button>

        {items &&
          items.map((item: JobOffer) => {
            return (
              <Card
                variant="outlined"
                sx={{ width: "100%", margin: "5px" }}
                key={item.id}
              >
                <CardContent>
                  {/* <Image>{item.logo}</Image> */}
                  <Typography>{item.category}</Typography>
                  <Typography>{item.title}</Typography>
                  <Typography>{item.detail}</Typography>
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

export default Company;
