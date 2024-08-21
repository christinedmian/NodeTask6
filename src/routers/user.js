
const express = require('express')
const User = require('../models/user')
const bcryptjs = require("bcryptjs")
const auth=require('../middleware/auth')
const router = express.Router()




router.post('/users', (req, res) => {
    console.log(req.body)


    const user = new User(req.body)
    user.save()
        .then((user) => { res.status(200).send(user) })
        .catch((e) => res.status(400).send(e))

})
////////////////////////////////////////////////////
//Get

router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users)
    })
        .catch((e) => { res.status(500).send(e) })
})

////////////////////////////////////////////

router.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send('unable to find user')
        }
        res.status(200).send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

//////////////////////////////////////////////
//Patch



router.patch('/users/:id', async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        console.log(updates)  //  array of what user was updated


        const _id = req.params.id

        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send('UNABLE TO FIND USER')
        }

        if (req.body.password) {
            const isSamePassword = await bcryptjs.compare(req.body.password, user.password);
            if (isSamePassword) {
                updates.splice(updates.indexOf('password'), 1);
                delete req.body.password;
            }
        }

        updates.forEach((ele) => (user[ele] = req.body[ele]));
        await user.save()
        res.status(200).send(user)
    }

    catch (error) {
        res.status(500).send(error)
    }
})

///////////////////////////////////////////////////////////////

//Delete

router.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send('UNABLE TO FIND USER')
        }
        res.status(200).send(user)    // // سيتم هنا استدعاء toJSON تلقائيًا
    }
    catch (error) {
        res.status(500).send(error)
    }
})
////////////////////////////////////////////////////////////////////////////////////////////////////
//login:

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(200).send({ u: user, t: token })
    }
    catch (e) {
        res.status(400).send(e.message)

    }
})

///////////////////////////////////////////////////////////////////////////////////////////

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        const token = await user.generateToken()
        await user.save()
        res.status(200).send({ user, token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

///////////////////////////////////////////////////////////////////////////////
router.get('/profile', auth, async (req, res) => {
    res.status(200).send(req.user)
})
////////////////////////////////////////////////////////////////
router.delete('/logout', auth, async (req, res) => {
    try {
        console.log(req.user)
        req.user.tokens = req.user.tokens.filter((ele) => {
            return ele !== req.token
        })
        await req.user.save()
        res.send()

    }
    catch (e) {
        res.status(500).send(e)
    }
})

////////////////////////////////////////////////////////////
router.delete('logaoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch (e) {
        res.status(500).send(e)

    }
})


///////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router