const express=require('express')
const { login, createUser } = require('../controller/userController')
const router=express.Router()

router.post('/login',login)
router.post('/register',createUser)

module.exports=router