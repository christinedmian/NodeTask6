

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require('../src/db/mongoose')
app.use(express.json())

const userRouter=require("../src/routers/user")
const articleRouter = require('./routers/article')

app.use(userRouter)
app.use(articleRouter)


app.listen(port, () => {
    console.log("app is listening on port 3000")
})

