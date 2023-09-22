import express from 'express'
import cors from 'cors'
import csv from 'csvtojson'

let data = {};
csv().fromFile('electronic_items-1.csv').then((jsonObj) => {
    data = jsonObj;
})

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

app.get('/api/products', (req, res) => {
    res.status(200).json(data)
});

app.get('/api/products/:id', (req, res) => {
    const id = Number(req.params.id)
    const product = data.find(product => Number(product.id) === id)
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).end()
    }
});

app.post('/api/products', (req, res) => {
    const product = req.body
    if (!product) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const ids = data.map(product => Number(product.id))
    const maxId = Math.max(...ids)

    const newProduct = {
        id: maxId + 1,
        ...product
    }

    data = [...data, newProduct]

    res.status(201).json(newProduct)
});

app.put('/api/products/:id', (req, res) => {
    const id = Number(req.params.id)
    const updatedProduct = { id, ...req.body }
    let exists = data.find(product => Number(product.id) === id)
    if (!exists) {
        return res.status(404).end()
    }
    data = data.map(product => Number(product.id) !== id ? product : updatedProduct)

    res.status(200).json(updatedProduct)
});

app.delete('/api/products/:id', (req, res) => {
    const id = Number(req.params.id)
    let removedProduct = data.find(product => Number(product.id) === id)
    if (!removedProduct) {
        return res.status(404).end()
    } else {
        data = data.filter(product => Number(product.id) !== id)
        res.status(200).json(removedProduct)
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`))