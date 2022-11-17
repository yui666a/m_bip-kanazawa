import type { NextPage } from "next";
import { useRouter } from "next/router";

import Router from "next/router";
import Head from "next/head";
import styles from "/styles/Home.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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
import { Input, TextField, Typography } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import { width } from "@mui/system";

const onClickHandler = (
  my_id: number,
  title: string,
  category: string,
  detail: string,
  reward: string,
  router: any
) => {
  console.log("post");
  if (title === "" || detail === "") {
    alert("タイトルと詳細を入力してください。");
    return;
  }

  const urlBase =
    "https://script.google.com/macros/s/AKfycbyqG7KOoehDPDq9uI1eHzGKiZmX00AW1EG0sc3wnhKruNTKi9B2r19p08KBu5imfFl2hw/exec";
  axios
    .get(urlBase, {
      params: {
        mode: "create-job",
        title: title,
        category: category,
        author_id: my_id,
        detail: detail,
        reward: reward,
      },
    })
    .then((res) => {
      router.reload();
    });
};

type JobOffer = {
  logo: any;
  id: number;
  category: string;
  title: string;
  detail: string;
};

const Student: NextPage = () => {
  const router = useRouter();
  const sampleItems: JobOffer[] = [
    {
      id: 1,
      logo: "",
      category: "AAA",
      title: "aaaaa",
      detail: "this is detail",
    },
    {
      id: 2,
      logo: "",
      category: "BBB",
      title: "bbbbbbb",
      detail: "this is detail",
    },
    {
      id: 3,
      logo: "",
      category: "CCC",
      title: "cccccccc",
      detail: "this is detail",
    },
  ];

  const [jobTitle, setJobTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobDetail, setJobDetail] = useState("");
  const [jobReward, setJobReward] = useState("");
  const [myId, setMyId] = useState<number>();
  const [myUserId, setMyUserId] = useState("");
  useEffect(() => {
    // console.log("useEffect");
    setMyId(Number(localStorage.getItem("id")));
    setMyUserId(String(localStorage.getItem("userId")));
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
        <AppBar position="static">
          <Grid container>
          <Grid item xs={12} md={2}></Grid>
          <Grid item xs={12} md={8}>
            質問したい内容を入力して下さい
            <Typography variant="h5">
              質問投稿ページ
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

      <main className={styles.main}>
        <Card
          variant="outlined"
          sx={{ width: "100%", margin: "5px", marginTop: "50px" }}
        >
          <CardContent>
            <Typography>案件の追加</Typography>

            <TextField
              onChange={(event) => setJobTitle(event.target.value)}
              label="タイトル"
              id="filled-hidden-label-small"
              variant="filled"
              size="small"
              sx={{ width: "100%", my: "10px" }}
            />

            <TextField
              onChange={(event) => setJobCategory(event.target.value)}
              label="カテゴリ"
              id="filled-hidden-label-small"
              variant="filled"
              size="small"
              sx={{ width: "100%", my: "10px" }}
            />

            <TextField
              onChange={(event) => setJobDetail(event.target.value)}
              id="filled-hidden-label-small"
              label="内容"
              multiline
              rows={4}
              sx={{ width: "100%", my: "10px" }}
            />

            <TextField
              onChange={(event) => setJobReward(event.target.value)}
              id="filled-hidden-label-small"
              label="報酬"
              variant="filled"
              size="small"
              sx={{ width: "100%", my: "10px" }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                onClickHandler(
                  myId!,
                  jobTitle,
                  jobCategory,
                  jobDetail,
                  jobReward,
                  router
                )
              }
            >
              送信
            </Button>
          </CardContent>
        </Card>
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
