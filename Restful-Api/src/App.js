const express = require('express');
require("./db/connection");
// const User = require('./models/users');

const app = express();

const port = process.env.PORT || 4000;

// app.use(express.json());

app.post("/students", (req, res) => {
    console.log(req.body);

    res.send("Hello");

    // const data = new User(req.body);
    // data.save().then(() => {
    //     res.status(201).send(data);
    //     return data;
    // }).catch((e) => {
    //     res.status(400).send(e);
    //     console.log(e)
    // });
});

app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
});