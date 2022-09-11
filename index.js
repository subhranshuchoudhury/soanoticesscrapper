const axios = require("axios");
const cheerio = require("cheerio");
const express = require('express');
const app = express();

// static folder for sending files.

app.use(express.static(__dirname + '/public'));

// cors policy

app.use((req, res, next) => { res.header({ "Access-Control-Allow-Origin": "*" }); next(); })

// homepage 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/Home.html');
});

// web status (soa website)
app.get('/web-status/', (req, res) => {
    const checkWebStatus = async () => {
        try {
            const response = await axios.get('https://www.soa.ac.in/general-notifications');
            res.send({ status: response.status, statusText: response.statusText });
        } catch (error) {
            res.send(error);
        }
    }
    checkWebStatus();
});


// Iter General Notification Section

app.get('/gn', (req, res) => {
    const url = "https://www.soa.ac.in/general-notifications";
    const scrapeData = async () => {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const GeneralNotifications = [];
            for (let index = 1; index < 21; index++) {
                const notification = { event: "", s_date: "", eventLink: "" };
                notification.event = $(`.article-index-${index} a.BlogList-item-title`).text();
                notification.s_date = $(`.article-index-${index} time`).text();
                notification.eventLink = 'https://www.soa.ac.in' + $(`.article-index-${index} a.BlogList-item-title`).attr('href');
                GeneralNotifications.push(notification);
            }
            res.send(GeneralNotifications);
        } catch (err) {
            console.error(err);
        }
    }
    scrapeData();
});



// Iter student notice section

app.get('/sn', (req, res) => {
    const url = "https://www.soa.ac.in/iter-student-notice";
    const scrapeData = async () => {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const GeneralNotifications = [];
            for (let index = 1; index < 21; index++) {
                const notification = { event: "", s_date: "", eventLink: "" };
                notification.event = $(`.article-index-${index} a.BlogList-item-title`).text();
                notification.s_date = $(`.article-index-${index} time`).text();
                notification.eventLink = 'https://www.soa.ac.in' + $(`.article-index-${index} a.BlogList-item-title`).attr('href');
                GeneralNotifications.push(notification);
            }
            res.send(GeneralNotifications);
        } catch (err) {
            console.error(err);
        }
    }
    scrapeData();
});

app.get('/en', (req, res) => {
    const url = "https://www.soa.ac.in/iter-exam-notice";
    const scrapeData = async () => {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const GeneralNotifications = [];
            for (let index = 1; index < 21; index++) {
                const notification = { event: "", s_date: "", eventLink: "" };
                notification.event = $(`.article-index-${index} a.BlogList-item-title`).text();
                notification.s_date = $(`.article-index-${index} time`).text();
                notification.eventLink = 'https://www.soa.ac.in' + $(`.article-index-${index} a.BlogList-item-title`).attr('href');
                GeneralNotifications.push(notification);
            }
            res.send(GeneralNotifications);
        } catch (err) {
            console.error(err);
        }
    }
    scrapeData();
});

// * for any url

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
})

app.listen(process.env.PORT || 4000, () => {
    console.log("Server running on Port 4000");
})

