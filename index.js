const express = require('express');
const app = express();
const countries = require('./countries.json');
const wishlistRouter = require('./wishlistRouter');

const PORT = 4001;

app.use(express.json());
app.use('/api/countries', wishlistRouter);

// // Step 01 
// // GET /api/countries - this should respond with a list of countries in your list. You should start off with 5 countries. 

// app.get('/api/countries', (req, res) => {
//     res.send(countries)
// })

// // Step 02
// // POST /api/countries - this route should accept JSON data and add the new country received to the list of countries (eg: add an object inside the countries array).

// app.post('/api/countries', (req, res) => {
//     const newCountry = {
//         id: countries.length + 1,
//         name: req.body.name,
//         alpha: req.body.alpha,
//         alpha3Code: req.body.alpha3Code,
//         visited: false
//     }
//     if (newCountry) {
//         countries.push(newCountry)
//         res.send(newCountry)
//     } else {
//         res.status(404).send();
//     }

// })

// // Step 03
// // GET /api/countries/:code - this route should return a single country, based on the code provided. You should accept both an alpha 2 or an alpha 3 code. 

// app.get('/api/countries/:code', (req, res) => {
//     const requestCountry = countries.find(element => element.alpha === req.params.code || element.alpha3Code === req.params.code)
//     if (requestCountry) {
//         res.send(requestCountry)
//     } else {
//         res.status(404).send()
//     }
// })


// // Step 04
// // PUT /api/countries/:code - this route should accept edits to an existing country in the list (eg: edit an object inside the countries array).

// app.put('/api/countries/:code', (req, res) => {
//     const requestCountry = countries.findIndex(element => element.alpha === req.params.code || element.alpha3Code === req.params.code)
//     Object.assign(countries[requestCountry], req.body)
//     res.send(countries[requestCountry]);

// })


// // Step 05
// // DELETE /api/countries/:code - this route should allow you to delete a specific country from the list (eg: remove an object from the array)

// app.delete('/api/countries/:code', (req, res) => {
//     const requestCountry = countries.findIndex(element => element.alpha === req.params.code || element.alpha3Code === req.params.code)
//     const deleteCountry = countries.splice(requestCountry, 1)
//     res.send(deleteCountry);

// })


// // Step 06
// // Add routing - Move all your request handlers to a specific router.For example, all requests made to / api / countries should be processed into a dedicated router like wishlistRouter.js




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


