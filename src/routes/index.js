const express = require('express');
const router = express.Router();

//const superheroRouter = require('./superheroRouter');
const productRouter = require('./productRouter');
const roleRouter = require('./roleRouter');
const authRouter = require('./authRouter');



//router.use('/superheros', superheroRouter);
router.use('/products', productRouter);
router.use('/roles', roleRouter);
router.use('/auth', authRouter);


module.exports = router;