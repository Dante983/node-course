const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result, get } = require('lodash');

// express app

const app = express();

// connect to db
const dbURI = 'mongodb+srv://savicn209:<password>@cluster0.fkjsunt.mongodb.net/node-js-db?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine

app.set('view engine', 'ejs');

// middleware & static files

app.use(express.static('public'));

app.use(morgan('dev'));

// mongoose and mongo sandob routes

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog 2',
//         body: 'more about my blog 2'
//     });

//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('64485645e7f520b018a9adde')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {

    res.render('about',{title: 'About' });

});

// blog routes

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'all Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog' });
});

// 404 page

app.use((req, res) => {
    res.status(404).render('404', {title: '404' });;
});
