let products=require('../products')
const {v4: uuidv4}=require('uuid')
const {writeDataToFile}=require('../util')
function findAll()
{
    return new Promise((resolve,reject)=>
    {
        resolve(products)
    })
}

function findById(id)
{
    return new Promise((resolve,reject)=>
    {   
       const ps=products.find((p)=>{return(p.id==id)})
       resolve(ps)
    })
}
function create(product)
{
    return new Promise((resolve,reject)=>
    {   
       const newProduct={id:uuidv4(),...product}
       products.push(newProduct)
       writeDataToFile('./data/products.json',products)
       resolve(newProduct)
    })
}
function update(id,product)
{
    return new Promise((resolve,reject)=>
    {   
       const index=products.findIndex((p)=>p.id==id)
       products[index]={id,...product}
       writeDataToFile('./data/products.json',products)
       resolve(products[index])
    })
}
function remove(id)
{
    return new Promise((resolve,reject)=>
    {   
        products =products.filter((p)=>p.id!==id)
       writeDataToFile('./data/products.json',products)
       resolve()
    })
}
module.exports=
{
    findAll,
    findById,
    create,
    update,
    remove
}