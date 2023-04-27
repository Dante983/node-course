const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result, get } = require('lodash');
const blogRoutes = require('./routes/blogRoutes')
const { render } = require('ejs');

// express app

const app = express();

// connect to db
const dbURI = 'mongodb+srv://savicn209:!Nikolasavic61@cluster0.fkjsunt.mongodb.net/node-js-db?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine

app.set('view engine', 'ejs');

// middleware & static files

app.use(express.static('public'));
//for accepting form data
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));

// mongoose and mongo sandob routes

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog 2',
        body: 'more about my blog 2'
    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});

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

app.use('/blogs', blogRoutes);

// 404 page

app.use((req, res) => {
    res.status(404).render('404', {title: '404' });;
});