const express = require('express');

// predef
const app = express();

const port = 5000;

//Set the view engine to ejs
app.set('view engine', 'ejs');



// @route       GET /
// @desc        Show landing default page
// @access      Public
// @license     Thiti Mahawannakit 60090500410
app.get('/', (req,res) => {
    res.render('pages/index', { curPort: port });
});

// @route       GET /speak
// @desc        Handler Empty Params
// @access      Public
// @license     Thiti Mahawannakit 60090500410
app.get('/speak', (req, res) => {
    res.render('emptyParamErr', { curPort: port, query: req.params.word, });
});

// @route       GET /speak/:word
// @desc        Output the params into HTML element
// @access      Public
// @license     Thiti Mahawannakit 60090500410
app.get('/speak/:word', (req, res) => {
    res.render('pages/speak', { query: req.params.word, curPort: port, picRandomize: `https://api.adorable.io/avatars/200/${req.params.word}.png` });
});

// @route       GET /repeat/:word/:amount
// @desc        Repeat the amount of word into the HTML element
// @access      Public
// @license     Thiti Mahawannakit 60090500410
app.get('/repeat/:word/:amount', (req, res) => {
    //check if amount is a number

    if(isNaN(req.params.amount)){
        res.render('notFondHandler', { query: req.params.word, curPort: port, additional: "Amount should be only number" });
    }else{
        //if is a number
        //Operation of generate text and looping to the array variable

        let generateLoopedTexted = [];

        for (let x = 0; x < req.params.amount; x++) {
            generateLoopedTexted.push(req.params.word);
        }

        res.render('pages/repeat', { query: req.params, curPort: port, outputText: generateLoopedTexted });
    }

});



// @route       GET /!notExist
// @desc        Show Error Handler
// @access      Public
// @license     Thiti Mahawannakit 60090500410
app.get('*', (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl + " Not Exist!"; //Get full path
    res.render('notFondHandler', { query: req.params.word, curPort: port, additional: fullUrl });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});