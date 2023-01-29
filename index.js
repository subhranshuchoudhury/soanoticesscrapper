const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

// cors policy

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

// homepage

app.get("/", (req, res) => {
  res.status(200).send({
    active: true,
    creator: "Subhranshu Choudhury",
  });
});

// web status (soa website)
app.get("/web-status/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.soa.ac.in/general-notifications"
    );
    res.send({ status: response.status, statusText: response.statusText });
  } catch (error) {
    res.status(500).send({ error: true, message: error });
  }
});

// Iter General Notification Section

app.get("/gn", async (req, res) => {
  const url = "https://www.soa.ac.in/general-notifications";

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const GeneralNotifications = [];
    for (let index = 1; index < 21; index++) {
      const notification = { event: "", s_date: "", eventLink: "" };
      notification.event = $(
        `.article-index-${index} a.BlogList-item-title`
      ).text();
      notification.s_date = $(`.article-index-${index} time`).text();
      notification.eventLink =
        "https://www.soa.ac.in" +
        $(`.article-index-${index} a.BlogList-item-title`).attr("href");
      GeneralNotifications.push(notification);
    }
    res.send(GeneralNotifications);
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err,
    });
  }
});

// Iter student notice section

app.get("/sn", async (req, res) => {
  const url = "https://www.soa.ac.in/iter-student-notice";

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const GeneralNotifications = [];
    for (let index = 1; index < 21; index++) {
      const notification = { event: "", s_date: "", eventLink: "" };
      notification.event = $(
        `.article-index-${index} a.BlogList-item-title`
      ).text();
      notification.s_date = $(`.article-index-${index} time`).text();
      notification.eventLink =
        "https://www.soa.ac.in" +
        $(`.article-index-${index} a.BlogList-item-title`).attr("href");
      GeneralNotifications.push(notification);
    }
    res.send(GeneralNotifications);
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err,
    });
  }
});

app.get("/en", async (req, res) => {
  const url = "https://www.soa.ac.in/iter-exam-notice";
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const GeneralNotifications = [];
    for (let index = 1; index < 21; index++) {
      const notification = { event: "", s_date: "", eventLink: "" };
      notification.event = $(
        `.article-index-${index} a.BlogList-item-title`
      ).text();
      notification.s_date = $(`.article-index-${index} time`).text();
      notification.eventLink =
        "https://www.soa.ac.in" +
        $(`.article-index-${index} a.BlogList-item-title`).attr("href");
      GeneralNotifications.push(notification);
    }
    res.send(GeneralNotifications);
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err,
    });
  }
});

// * for any url

app.get("*", (req, res) => {
  res.status(404).send({
    message: "wrong route",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server running on Port ", PORT);
});
