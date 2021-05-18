const express = require('express')

const app = express();
const port = process.env.PORT || 2121;

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json())


app.set('port', port);

const getQueryParams = (req, res, next) => {
    res.locals.queryStuff = req.query;
    next();
}

app.use(getQueryParams)

app.get('/', (req, res) => {
    console.log(queryStuff)
    res.render('home', req.locals.queryStuff);

})

app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use(function (err, req, res, next){
    console.error(err.stack)
    res.type('plain/text');
    res.status(500);
    res.send('500 - Server Error');
})

app.listen(app.get('port'), function() {
    console.log(`Server is running`)
})