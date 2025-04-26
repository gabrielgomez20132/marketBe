const express = require('express');
const router = express.Router();

//const superheroRouter = require('./superheroRouter');
const productRouter = require('./productRouter');
const roleRouter = require('./roleRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const mlRouter = require('./mlRouter');
const categoriesRouter = require('./categoriesRouter')



//router.use('/superheros', superheroRouter);
router.use('/categories', categoriesRouter)
router.use('/top-products', mlRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/roles', roleRouter);
router.use('/auth', authRouter);



module.exports = router;