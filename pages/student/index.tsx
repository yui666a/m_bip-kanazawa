import type { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";
import styles from "/styles/Home.module.css";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Grid from "@mui/material/Grid";
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
  status: string;
};
const styleStatusTag = {
  background: "rgb(120 120 120 / 0.5)",
  fontSize: "2rem",
  borderRadius: "2rem",
  padding: "0 1rem",
  width: "fit-content",
  display: "inline-block",
};
const styleCategoryTag = {
  background: "rgb(120 120 120 / 0.2)",
  borderRadius: "1rem",
  padding: "0 1rem",
  width: "fit-content",
  display: "inline-block",
};

const Student: NextPage = () => {
  const [items, setItems] = useState<JobOffer[]>([]);
  const [myUserId, setMyUserId] = useState("");

  const baseUrl =
    "https://script.google.com/macros/s/AKfycbyqG7KOoehDPDq9uI1eHzGKiZmX00AW1EG0sc3wnhKruNTKi9B2r19p08KBu5imfFl2hw/exec";
  useEffect(() => {
    const saveText = localStorage.getItem("jobs") || "[]";
    setItems(JSON.parse(saveText));

    axios
      .get(baseUrl, {
        params: {
          mode: "jobs",
        },
      })
      .then((res: any) => {
        console.log(res.data);
        localStorage.setItem("jobs", JSON.stringify(res.data));
        setItems(res.data);
      });
    setMyUserId(String(localStorage.getItem("userId")));
  }, []);

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
      <header className={styles.title}>
        <AppBar position="static">
          <Grid container>
          <Grid item xs={12} md={2}></Grid>
          <Grid item xs={12} md={8}>
            こんな疑問が投稿されています
            <Typography variant="h5">
            企業からの投稿一覧
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6" align="right" padding={"10px"}>
                {myUserId} さん
            </Typography>
          </Grid>
        </Grid>
        </AppBar>
      </header>
      <div className={styles.container}>
        <main className={styles.main} style={{ justifyContent: "unset" }}>
          {items &&
            items.map((item: JobOffer) => {
              let tag;
              switch (item.status) {
                case "takingApplications":
                  tag = (
                    <span
                      style={{
                        ...styleStatusTag,
                        background: "rgb(255 160 0)",
                        color: "white",
                      }}
                    >
                      募集中
                    </span>
                  );
                  break;
                case "solved":
                  tag = (
                    <span
                      style={{
                        ...styleStatusTag,
                        background: "rgb(0 28 255 / 0.9)",
                        color: "white",
                      }}
                    >
                      解決済み
                    </span>
                  );
                  break;
                case "closed":
                  tag = (
                    <span
                      style={{
                        ...styleStatusTag,
                        background: "rgb(120 120 120 / 0.5)",
                      }}
                    >
                      受付終了
                    </span>
                  );
                  break;
              }

              return (
                <Card
                  variant="outlined"
                  sx={{ width: "100%", margin: "5px", borderRadius: "2em" }}
                  key={item.id}
                  onClick={() => Router.push("/student/task/" + item.id)}
                >
                  <CardContent>
                    {/* <Image>{item.logo}</Image> */}

                    <div
                      style={{
                        display: "flex",
                        fontSize: "0.9em",
                        color: "gray",
                      }}
                    >
                      <Typography variant="h4">
                        {item.title}
                        {tag && tag}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        fontSize: "0.9em",
                        color: "gray",
                      }}
                    >
                      カテゴリ：
                      <Typography>
                        {item.category.split(/[.*?。、]/gm).map((cat) => {
                          return (
                            <span
                              key={cat}
                              style={{
                                ...styleCategoryTag,
                              }}
                            >
                              {cat}
                            </span>
                          );
                        })}
                      </Typography>
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
    </>
  );
};

export default Student;
