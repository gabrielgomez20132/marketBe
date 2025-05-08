const express = require('express');
const router = express.Router();

const productRouter = require('./productRouter');
const roleRouter = require('./roleRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const mlRouter = require('./mlRouter');
const categoriesRouter = require('./categoriesRouter');
const orderRouter = require('./orderRouter');
const permissionRouter = require('./permissionRouter');



router.use('/orders', orderRouter)
router.use('/categories', categoriesRouter)
router.use('/top-products', mlRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/roles', roleRouter);
router.use('/permissions', permissionRouter);
router.use('/auth', authRouter);



module.exports = router;