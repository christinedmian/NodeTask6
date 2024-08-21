const express = require('express')
const Article = require('../models/article')
const { findByIdAndDelete } = require('../models/user')

const auth = require('../middleware/auth')

const router = express.Router()

router.post('/articles',auth,async(req,res)=>{
    try{
        //لحتى يفهم الاوبجيت تبع البودي لازم استخدم سبريت اوبريتور
        const article = new Article({...req.body,owner:req.user._id})
        await article.save()
        res.status(200).send(article)
    }
    catch(e){
        res.status(400).send(e.message)
    }

})

router.get('/articles', auth, async (req, res) => {
    try {
        const articles = await Article.find({})
        res.status(200).send(articles)

    }
    catch (e) {
        res.status(500).send(e.message)
    }
})
router.get('/article/:id',auth,async(req,res)=>{
    try{
        // const task=await Task.findById(req.params.id)
        //هي مابيمشي حالا لان اذا يوزر عم يدور على ايدي تاسك مو تبعو مابيصير يجبلو يا
        const id=req.params.id
        const article=await Article.findOne({_id:id,owner:req.user._id})
        if(!article){
            return res.status(404).send('Not Found')
        }
        res.status(200).send(article)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

router.patch('/article/:id',auth,async(req,res)=>{
    try{
        const _id=req.params.id
        const article=await Article.findByIdAndUpdate({_id},req.body,{
            new:true,
            runValidators:true
        })
        if(!article){
            return res.status(404).send('Not Found')

        }
        res.status(200).send(article)

    }
    catch(e){
        res.status(500).send(e.message)

    }
})

router.delete('/article/:id',auth,async(req,res)=>{
    try{
        const article=await Article.findByIdAndDelete(req.params.id)
        if(!article){
            return res.status(404).send('Not Found')

        }
        res.status(200).send(article)
        
    }
    catch(e){
        res.status(500).send(e.message)

    }
})

module.exports=router