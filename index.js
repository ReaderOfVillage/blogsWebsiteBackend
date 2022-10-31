const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const BlogModel = require('./models/Blog')

app.use(cors())
app.use(express.json())

const password = "E&mS_{-k$KY3XqsA"

// DB conn
mongoose.connect(`mongodb+srv://CringyDuck:${password}@authcluster.en73t.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true })
console.log('connected to database')

app.post('/makePost', async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const user = req.body.user
    const date = req.body.date

    const blog = new BlogModel({ title: title, description: description, user: user, date: date })
    await blog.save()
    res.send('Done')
})

app.get(('/', async (req, res) => {
    res.send("cool")
}))

app.get('/read', async (req, res) => {
    BlogModel.find({}, (err, result) => {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.put("/update", async (req, res) => {
    const newPost = req.body.newPost
    const id = req.body.id

    try {
        await BlogModel.findById(id, (error, postToUpdate) => {
            postToUpdate.description = newPost
            postToUpdate.save()
        })
    } catch (err) {
        console.log(err)
    }

    res.send("updated")
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    await BlogModel.findByIdAndRemove(id).exec()
    res.send("Item Deleted")
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port 3001`)
})