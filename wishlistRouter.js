const express = require('express')
const router = express.Router()
const countries = require('./countries.json');
const { userValidationRules, validate } = require('./validator.js')

router.use(express.json());



// GET /api/countries - this should respond with a list of countries in your list. You should start off with 5 countries. 
// BONUS: add support for a query string that would return all countries sorted alphabetically; something like ?sort=true (hint: true will be passed as “true” - string type - in your query string)
// BONUS 2: Validate the data you receive before updating the country. 
// Can you make it so that you use the same validation logic that for the POST route, without duplicating your code?

router.get('/', (req, res) => {
    if (req.query.sort === "true") {        
        countries.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0
        })
        res.send(doubleCountries)
    } else {
        res.send(countries)
    }
})

// Step 02
// // POST /api/countries - this route should accept JSON data and add the new country received to the list of countries (eg: add an object inside the countries array).
// BONUS: Do not accept the country if it already exists in the list; check both the alpha 2 code and the alpha 3 code for a match.


router.post('/', userValidationRules(), validate, 
         (req, res) => {
    const isNew = countries.find(e => e.alpha === req.body.alpha || e.alpha3Code === req.body.alpha3Code)
    if (!isNew){
    const newCountry = {
        id: countries.length + 1,
        name: req.body.name,
        alpha: req.body.alpha,
        alpha3Code: req.body.alpha3Code,
        visited: req.body.visited
    }
    if (newCountry) {
        countries.push(newCountry)
        res.send(newCountry)
    } else {
    res.status(405).send();
    }
    } else {
        res.status(404).send()
    }

})

/* app.post(
    '/user',
    // username must be an email
    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      User.create({
        username: req.body.username,
        password: req.body.password,
      }).then(user => res.json(user));
    },
  ); */

// Step 03
// GET //:code - this route should return a single country, based on the code provided. You should accept both an alpha 2 or an alpha 3 code. 
//BONUS: handle the situation where the country does not exist in your list


router.get('/:code', (req, res) => {
    const requestCountry = countries.find(element => element.alpha === req.params.code || element.alpha3Code === req.params.code)
    if (requestCountry) {
        res.send(requestCountry)
    } else {
        res.status(404).send()
    }
})


// Step 04
// PUT /api/countries/:code - this route should accept edits to an existing country in the list (eg: edit an object inside the countries array).
// BONUS: Check if the country is in your list before allowing edition. 
// BONUS 2: Validate the data you receive before updating the country. 
// Can you make it so that you use the same validation logic that for the POST route, without duplicating your code?

router.put('/:code', userValidationRules(), validate, (req, res) => {
    const requestCountry = countries.findIndex(element => element.alpha === req.params.code || element.alpha3Code === req.params.code)
    if (requestCountry !== -1) {
        Object.assign(countries[requestCountry], req.body)
        res.send(countries[requestCountry])
    } else {
        res.status(404).send()
    }

})


// Step 05
// DELETE /api/countries/:code - this route should allow you to delete a specific country from the list (eg: remove an object from the array)

router.delete('/:code', (req, res) => {
    const requestCountry = countries.findIndex(element => element.alpha === req.params.code || element.alpha3Code === req.params.code)
    if (requestCountry !== -1) {
        const deleteCountry = countries.splice(requestCountry, 1)
        res.send(deleteCountry)
    } else {
        res.status(404).send()
    }

})

module.exports = router