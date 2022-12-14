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
  const [myUserId, setMyUserId] = useState("");

  const baseUrl =
    "https://script.google.com/macros/s/AKfycbyqG7KOoehDPDq9uI1eHzGKiZmX00AW1EG0sc3wnhKruNTKi9B2r19p08KBu5imfFl2hw/exec";
  useEffect(() => {
    if (typeof task_id === "undefined") return;

    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    setJob(
      jobs.filter((job) => {
        return job.id == task_id;
      })[0]
    );

    axios
      .get(baseUrl, {
        params: {
          mode: "job",
          id: task_id,
        },
      })
      .then((res: any) => {
        setJob(res.data);
      });

    setMyUserId(String(localStorage.getItem("userId")));
  }, [task_id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const params = {
      mode: "create-idea",
      author_id: localStorage.getItem("id"),
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
        <title>????????????</title>
        <meta
          name="description"
          content="????????????????????????????????????????????????????????????"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.title}>
        <AppBar position="static">
          <Grid container>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={8}>
              ?????????????????????
              <Typography variant="h5">?????????????????????????????????</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="h6" align="right" padding={"10px"}>
                {myUserId} ??????
              </Typography>
            </Grid>
          </Grid>
        </AppBar>
      </header>
      <div className={styles.container}>
        <main className={styles.main} style={{ justifyContent: "unset" }}>
          <Typography variant="h3" align="left">
            ??????
          </Typography>
          {job && (
            <Card
              variant="outlined"
              sx={{ width: "100%", margin: "5px", marginBottom: "50px" }}
            >
              <Typography variant="h4" align="left">
                {job && job.title}
              </Typography>
              <Typography>??????????????????{job.category}</Typography>
              <Typography>????????????{job.author.name}</Typography>
              <Typography>?????????{job.reward}</Typography>
              <Typography>?????????{job.detail}</Typography>
            </Card>
          )}
          <Typography variant="h3" align="left">
            ??????????????????
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ width: "100%", margin: "5px", marginBottom: "50px" }}
          >
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
              label="?????????????????????"
              autoFocus
            />
            <TextField
              autoComplete=""
              required
              fullWidth
              name="detail"
              id="detail"
              label="??????"
              autoFocus
              multiline
              rows={8}
              style={{ marginTop: "1em" }}
            />
            <Button type="submit" variant="contained" style={{ margin: "1em" }}>
              ????????????
            </Button>
            {/* </Card> */}
          </Box>
          <Typography variant="h3" align="left">
            ???????????????????????????
          </Typography>
          <Card
            variant="outlined"
            sx={{ width: "100%", margin: "5px", marginBottom: "50px" }}
          >
            <ul>
              {job &&
                job.ideas &&
                job.ideas.map((idea: any) => {
                  return (
                    <li key={idea.id}>
                      <Typography variant="h6" align="left">
                        {idea.title}
                      </Typography>
                    </li>
                  );
                })}
            </ul>
          </Card>
        </main>

        <footer className={styles.footer}>
          <a
            // TODO: ????????????????????????
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
