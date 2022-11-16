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
import axios from "axios";



type JobOffer = {
  logo?: any;
  id: number;
  category: string;
  title: string;
  detail?: string;
  reward?: number;
};

// var my_id = localStorage.getItem('id');
var my_id = 3;


const Company: NextPage = () => {

  const [items, setItems] = useState<JobOffer[]>([]);

  const baseUrl =
  "https://script.google.com/macros/s/AKfycbyqG7KOoehDPDq9uI1eHzGKiZmX00AW1EG0sc3wnhKruNTKi9B2r19p08KBu5imfFl2hw/exec";
useEffect(() => {
  axios
    .get(baseUrl, {
      params: {
        mode: "jobs",
        author_id: my_id,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      setItems(res.data);
    });
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
        <AppBar position="static">Company My Page</AppBar>
      </header>

      <main className={styles.main}>


        <Button
          variant="contained"
          // startIcon={<WorkIcon />}
          // endIcon={<StorefrontIcon />}
          onClick={() => Router.push("/company/add")}
        >
          {/* 新しく質問する */}
          <Typography variant="h4">新しく質問する</Typography>
        </Button>

        {items &&
          items.map((item: JobOffer) => {
            return (
              <Card
                variant="outlined"
                sx={{ width: "100%", margin: "5px", borderRadius: "2em" }}
                key={item.id}
                onClick={() => Router.push("company/task/" + item.id)}
              >
                <CardContent>
                  {/* <Image>{item.logo}</Image> */}
                  <Typography variant="h4">{item.title}</Typography>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "0.9em",
                      color: "gray",
                    }}
                  >
                    カテゴリ：
                    <Typography>{item.category}</Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "0.9em",
                      color: "gray",
                    }}
                  >
                    ￥<Typography>{item.reward}</Typography>
                  </div>
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
