// @ts-nocheck
import type { NextPage } from "next";
import { useRouter } from "next/router";

import Router from "next/router";
import Head from "next/head";
import styles from "/styles/Home.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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
import axios from "axios";

type JobOffer = {
  logo: any;
  id: number;
  category: string;
  title: string;
  detail: string;
};

const Task: NextPage = () => {
  const router = useRouter();
  const { task_id } = router.query;

  const [job, setJob] = useState();

  const baseUrl =
    "https://script.google.com/macros/s/AKfycbyqG7KOoehDPDq9uI1eHzGKiZmX00AW1EG0sc3wnhKruNTKi9B2r19p08KBu5imfFl2hw/exec";
  useEffect(() => {
    axios
      .get(baseUrl, {
        params: {
          mode: "job",
          id: task_id,
        },
      })
      .then((res: any) => {
        console.log(res.data);
        setJob(res.data);
      });
  }, [task_id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const params = {
      mode: "create-idea",
      author_id: localStorage.getItem("userId"),
      title: data.get("title"),
      detail: data.get("detail"),
      jobs_id: task_id,
    };
    axios.get(baseUrl, { params: params }).then((res: any) => {
      Router.push("/student");
    });
  };

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
        <AppBar position="static">　</AppBar>
      </header>
      <div className={styles.container}>
        <main className={styles.main} style={{ justifyContent: "unset" }}>
          <Typography variant="h2" align="left">
            質問
          </Typography>
          <Card
            variant="outlined"
            sx={{ width: "100%", margin: "5px", marginBottom: "50px" }}
          >
            <Typography variant="h4" align="left">
              {job && job.title}
            </Typography>
            <Typography>カテゴリー：{job && job.category}</Typography>
            <Typography>質問社：{job && job.author_id}</Typography>
            <Typography>報酬：{job && job.reward}</Typography>
          </Card>
          <Typography variant="h2" align="left">
            あなたの回答
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            {/* <Card
              variant="outlined"
              sx={{ width: "100%", margin: "5px", marginBottom: "50px" }}
            > */}
            <TextField
              autoComplete=""
              required
              fullWidth
              name="title"
              id="title"
              label="回答のタイトル"
              autoFocus
              style={{ margin: "1em" }}
            />
            <TextField
              autoComplete=""
              required
              fullWidth
              name="detail"
              id="detail"
              label="詳細"
              autoFocus
              multiline
              rows={8}
              style={{ margin: "1em" }}
            />
            <Button type="submit" variant="contained" style={{ margin: "1em" }}>
              投稿する
            </Button>
            {/* </Card> */}
          </Box>
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

export default Task;
