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

  const [jobData, setJobDatas] = useState({});
  const [ideasData, setIdeasDatas] = useState({});

  const [items, setItems] = useState([]);

  const urlBase =
    "https://script.google.com/macros/s/AKfycbyqG7KOoehDPDq9uI1eHzGKiZmX00AW1EG0sc3wnhKruNTKi9B2r19p08KBu5imfFl2hw/exec";

  // task_idが変わるたびに処理を実行
  useEffect(() => {
    console.log("useEffect");
    console.log(task_id);
    const urlApiJob = urlBase + "?mode=job&id=" + task_id;
    axios.get(urlApiJob).then((res) => {
      if (res.data !== "job not found") {
        setJobDatas(res.data);

        const urlApiIdeas =
          "https://script.google.com/macros/s/AKfycbyqG7KOoehDPDq9uI1eHzGKiZmX00AW1EG0sc3wnhKruNTKi9B2r19p08KBu5imfFl2hw/exec?mode=ideas";
        axios.get(urlApiIdeas).then((resIdeas) => {
          if (resIdeas.data !== "job not found") {
            setIdeasDatas(resIdeas.data);
          }
        });
      }
    });
  }, [task_id]);

  let author_name = "";
  let author_id = -1;
  let state_str = "";
  try {
    author_name = jobData.author.name;
    author_id = jobData.author.id;
    state_str = "回答受付中";
  } catch (e) {
    // console.log(`エラー発生 ${e}`);
  }

  if (author_id === -1) {
    return;
  }

  // ideaリストを走査していき、task_idと一致するものだけideaidを取得
  let ideaIdList: any[] = new Array(0);
  try {
    console.log("要素数:" + Object.keys(ideasData).length);
    ideasData.forEach((idea) => {
      console.log("idea");
      if (idea.job.id == task_id) {
        ideaIdList.push(idea.id);
        // console.log(idea.job.id);
      }
    });
  } catch (e) {
    console.log(`エラー発生 ${e}`);
  }

  // setItems(ideaIdList);

  // console.log("jobData");
  // console.log(jobData);
  console.log("ideasData");
  console.log(ideasData);
  console.log("");

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
        <Card
          variant="outlined"
          sx={{ width: "100%", margin: "5px", marginBottom: "50px" }}
          // key={item.id}
        >
          <CardContent>
            <Typography variant="h6" align="left">
              {state_str}
            </Typography>

            <Typography
              variant="h4"
              align="left"
              sx={{ borderBottom: 1, borderColor: "#eaeaea" }}
            >
              {jobData["title"]} #{jobData["id"]}
            </Typography>

            <Typography sx={{ width: "100%", my: "10px" }}>
              カテゴリ：{jobData["category"]}
            </Typography>

            <Typography sx={{ width: "100%", my: "10px" }}>
              <a
                href="https://www.nagaokaut.ac.jp/"
                target="_blank"
                rel="noreferrer"
              >
                {author_name} さん
              </a>
            </Typography>

            <Typography sx={{ width: "100%", padding: "10px" }}>
              {jobData["detail"]}
            </Typography>
          </CardContent>
        </Card>

        {ideaIdList &&
          ideaIdList.map((item_id: any) => {
            let idea = ideasData[(item_id - 1).toString()];
            console.log(idea);

            let idea_author_name = "";
            let idea_author_id = -1;
            try {
              idea_author_name = idea.author.name;
              author_id = idea.author.id;
            } catch (e) {
              console.log(`エラー発生 ${e}`);
            }

            return (
              <Card
                variant="outlined"
                sx={{ width: "100%", margin: "5px" }}
                key={item_id}
              >
                <CardContent>
                  <Typography variant="h6" align="left">
                    [{idea.status}] {idea_author_name} さん
                  </Typography>

                  <Typography
                    variant="h6"
                    align="left"
                    sx={{ borderBottom: 1, borderColor: "#eaeaea" }}
                  >
                    {idea.title}
                  </Typography>

                  <Typography sx={{ width: "100%", padding: "10px" }}>
                    {idea.detail}
                  </Typography>

                  {/* <Image>{item.logo}</Image> */}
                  {/* <Typography>item.title{}</Typography>
                    <Typography>item.detail{item.detail}</Typography> */}
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

export default Task;
