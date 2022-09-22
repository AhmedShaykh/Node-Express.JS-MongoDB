const express = require('express');
const path = require('path');
const blogs = require('../data/blogs');

const router = express.Router();

router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, "../views/index.html"));
    res.render("home");
});

router.get('/blog', (req, res) => {
    // blogs.forEach(e => {
    //     console.log(e.title);
    // });
    // res.sendFile(path.join(__dirname, "../views/blog.html"));

    res.render("blogHome", {
        blogs: blogs
    });
});

router.get('/blogpost/:slug', (req, res) => {
    myBlogs = blogs.filter((e) => {
        return e.slug == req.params.slug;
    });
    // res.sendFile(path.join(__dirname, "../views/blogpage.html"));
    // console.log(myBlogs);

    res.render("blogPage", {
        title: myBlogs[0].title,
        content: myBlogs[0].content
    });
});

module.exports = router;