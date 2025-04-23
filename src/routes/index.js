const express = require('express');
const router = express.Router();

//const superheroRouter = require('./superheroRouter');
const productRouter = require('./productRouter');
const roleRouter = require('./roleRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');



//router.use('/superheros', superheroRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/roles', roleRouter);
router.use('/auth', authRouter);


module.exports = router;