const { response } = require('express')
const User = require('../models/user')
const clearCache = require ('../services/redis')

// show list the user
const readUser = (req, res, next) => {
    User.find().cache()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

const show = (req, res, next) => {
    let userID = req.body.userID
    User.findById(userID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An erorr Occured'
            })
        })
}

const findAccount = (req, res, next) => {
    User.findOne({accountNumber: req.params.account})
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An erorr Occured'
            })
        })
}

const findIdentity = (req, res, next) => {
    User.findOne({identityNumber: req.params.identity})
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An erorr Occured'
            })
        })
}

//add users
const addUser = async (req, res, next) => {
    let user = new User({
        userName: req.body.userName,
        accountNumber : req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber : req.body.identityNumber
    })
    const nameUser          = await User.findOne({userName : user.userName})
    const numberAccount     = await User.findOne({accountNumber : user.accountNumber})
    const emailUser         = await User.findOne({emailAddress : user.emailAddress})
    const numberIdentity    = await User.findOne({identityNumber : user.identityNumber})
    if (nameUser) {
        return res.status(404).json({
            status: false,
            message: 'user name sudah terdaftar'
        })
    }
    if (numberAccount) {
        return res.status(404).json({
            status: false,
            message: 'account number sudah terdaftar'
        })
    }
    if (emailUser) {
        return res.status(404).json({
          status: false,
          message: 'email sudah terdaftar'
        })
      }
      if (numberIdentity) {
        return res.status(404).json({
          status: false,
          message: 'identity number sudah terdaftar'
        })
      }
    user.save()
    .then(responce=>{
        res.json ({
            message:'User added succes'
        })
    })
    .catch(error => {
        res.json ({
            message: 'An error'
        })
    })
    
}

//update an user
const updateUser = (req, res, next) => {
    let userID = req.body.userID

    let updateUser = {
        userName: req.body.userName,
        accountNumber : req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber : req.body.identityNumber
    }
    User.findByIdAndUpdate(userID, {$set: updateUser})
    .then(()=> {
        res.json ({
            message: 'user updated succesfully'
        })
    })
    .catch(error=> {
        res.json({
            message: 'an erorr Occured'
        })

    })
}

//delete an user
const deleteUser = ( req,res,next) => {
    let userID = req.body.userID
    User.findByIdAndRemove(userID)
    .then(()=>{
        res.json ({
            message: 'User deleted succesfully'
        })
    })
    .catch(error=> {
        res.json({
            message:'An error Occured'
        })
    })
}

module.exports = {
    readUser, 
    show, 
    addUser, 
    updateUser, 
    deleteUser, 
    findAccount,
    findIdentity
}