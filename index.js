const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

// cors policy

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

app.get("/", (req, res) => {
  res.status(200).send({
    active: true,
    creator: "Subhranshu Choudhury",
  });
});

app.get("/gn", async (req, res) => {
  const url = "https://www.soa.ac.in/general-notifications";
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const generalNotice = [];
    for (let index = 1; index < 10; index++) {
      const notification = { event: "", s_date: "", eventLink: "" };
      notification.event = $(
        `article.blog-basic-grid--container:nth-of-type(${index}) .blog-title a`
      )
        .text()
        .replace(/\n/g, " ")
        .trim();
      notification.s_date = $(
        `article.blog-basic-grid--container:nth-of-type(${index}) .blog-meta-secondary time`
      ).text();
      notification.eventLink =
        "https://www.soa.ac.in" +
        $(
          `article.blog-basic-grid--container:nth-of-type(${index}) .blog-title a`
        ).attr("href");
      generalNotice.push(notification);
    }
    res.send(generalNotice);
  } catch (err) {
    res.json([
      {
        event: "There is a problem getting the data, please try again later",
        s_date: "-",
        eventLink: "https://www.soa.ac.in/iter-exam-notice",
      },
    ]);
  }
});

app.get("/sn", async (req, res) => {
  const url = "https://www.soa.ac.in/iter-student-notice";
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const studentNotice = [];
    for (let index = 1; index < 10; index++) {
      const notification = { event: "", s_date: "", eventLink: "" };
      notification.event = $(
        `article.blog-basic-grid--container:nth-of-type(${index}) .blog-title a`
      )
        .text()
        .replace(/\n/g, " ")
        .trim();
      notification.s_date = $(
        `article.blog-basic-grid--container:nth-of-type(${index}) .blog-meta-secondary time`
      ).text();
      notification.eventLink =
        "https://www.soa.ac.in" +
        $(
          `article.blog-basic-grid--container:nth-of-type(${index}) .blog-title a`
        ).attr("href");
      studentNotice.push(notification);
    }
    res.send(studentNotice);
  } catch (err) {
    res.json([
      {
        event: "There is a problem getting the data, please try again later",
        s_date: "-",
        eventLink: "https://www.soa.ac.in/iter-exam-notice",
      },
    ]);
  }
});

app.get("/en", async (req, res) => {
  const url = "https://www.soa.ac.in/iter-exam-notice/";
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const examNotification = [];
    for (let index = 1; index < 10; index++) {
      const notification = { event: "", s_date: "", eventLink: "" };
      notification.event = $(
        `article.blog-basic-grid--container:nth-of-type(${index}) .blog-title a`
      )
        .text()
        .replace(/\n/g, " ")
        .trim();
      notification.s_date = $(
        `article.blog-basic-grid--container:nth-of-type(${index}) .blog-meta-secondary time`
      ).text();
      notification.eventLink =
        "https://www.soa.ac.in" +
        $(
          `article.blog-basic-grid--container:nth-of-type(${index}) .blog-title a`
        ).attr("href");
      examNotification.push(notification);
    }
    res.send(examNotification);
  } catch (err) {
    res.json([
      {
        event: "There is a problem getting the data, please try again later",
        s_date: "-",
        eventLink: "https://www.soa.ac.in/iter-exam-notice",
      },
    ]);
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server running on Port ", PORT);
});
