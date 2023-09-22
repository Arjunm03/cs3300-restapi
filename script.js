async function runCalls() {
    let response = await fetch(`http://localhost:4000/api/products`)
    let data = await response.json()
    console.log('Getting all products')
    console.log(data)
    let response2 = await fetch(`http://localhost:4000/api/products/1`)
    let data2 = await response2.json()
    console.log('Getting product with id 1')
    console.log(data2)
    const product = {
        name: 'Super Cood Product',
        quantity: '100',
    }
    let response3 = await fetch(`http://localhost:4000/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    let data3 = await response3.json()
    console.log('Creating a new product')
    console.log(data3)
    let response4 = await fetch(`http://localhost:4000/api/products/1`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    let data4 = await response4.json()
    console.log('Updating product with id 1')
    console.log(data4)
    let response5 = await fetch(`http://localhost:4000/api/products/1`, {
        method: 'DELETE'
    })
    let data5 = await response5.json()
    console.log('Deleting product with id 1')
    console.log(data5)
}

runCalls()