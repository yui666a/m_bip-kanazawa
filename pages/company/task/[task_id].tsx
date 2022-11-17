// @ts-nocheck
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import styles from "/styles/Home.module.css";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type JobOffer = {
  logo?: any;
  id: number;
  category: string;
  title: string;
  detail?: string;
};

const Task: NextPage = () => {
  const router = useRouter();
  const { task_id } = router.query;
  const [jobData, setJobDatas] = useState<JobOffer>({});
  const urlBase =
    "https://script.google.com/macros/s/AKfycbyqG7KOoehDPDq9uI1eHzGKiZmX00AW1EG0sc3wnhKruNTKi9B2r19p08KBu5imfFl2hw/exec";

  // task_idが変わるたびに処理を実行
  const [myUserId, setMyUserId] = useState("");

  useEffect(() => {
    const urlApiJob = urlBase + "?mode=job&id=" + task_id;
    axios.get(urlApiJob).then((res) => {
      if (res.data !== "job not found") {
        setJobDatas(res.data);
      }
    });

    setMyUserId(String(localStorage.getItem("userId")));
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
    // console.log("要素数:" + jobData.ideas.length);
    let len = jobData.ideas.length;
    ideaIdList = [...Array(len)].map((_: undefined, idx: number) => idx);
  } catch (e) {
    // console.log(`エラー発生 ${e}`);
  }

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
              アイディアのチェック
              <Typography variant="h5">
                ドクターたちのプランをチェックしよう！
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
        <main className={styles.main}>
          <Card
            variant="outlined"
            sx={{ width: "100%", margin: "5px", marginBottom: "50px" }}
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
              let idea = jobData.ideas[item_id];

              let idea_author_name = "";
              let idea_author_id = -1;
              try {
                idea_author_name = idea.author.name;
                author_id = idea.author.id;
              } catch (e) {
                // console.log(`エラー発生 ${e}`);
              }

              return (
                <Card
                  variant="outlined"
                  sx={{ width: "100%", margin: "5px" }}
                  key={item_id}
                >
                  <CardContent>
                    <Typography variant="h6" align="left">
                      {idea_author_name} さん
                      {/* [{idea.status}] {idea_author_name} さん */}
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

export default Task;
