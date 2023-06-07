const Product=require('../modules/productmodule')
const {getPostData}=require('../util')
//get all products
async function getProducts(req,res)
{
    try
    {
        const product=await Product.findAll()
        res.writeHead(200,{'Contenct-Type':'application/json'}),
        res.end(JSON.stringify(product))
    }catch(error)
    {
        console.log(error)
    }
}

//get product
async function getProduct(req,res, id)
{
    try
    {
        const product=await Product.findById(id)
        if(!product)
        {
            res.writeHead(200,{'Contenct-Type':'application/json'}),
            res.end(JSON.stringify({message:'product not found'}))  
        }else
        {
            res.writeHead(200,{'Contenct-Type':'application/json'}),
            res.end(JSON.stringify(product))
        }
    }catch(error)
    {
        console.log(error)
    }
}

    async function createProduct(req,res)
{
    try
    {
        const body =await getPostData(req)
        const {title,price}=JSON.parse(body)

        const product =
        {
            title,
            price
        }
        const newProduct= await Product.create(product)
        res.writeHead(201,{'Content-Type':'appliction/json'})
        return res.end(JSON.stringify(newProduct))
    
    }catch(error)
    {
        console.log(error)
    }
}
//update
async function updateProduct(req,res, id)
{
    try
    {
        const product=await Product.findById(id)
        if(!product)
        {
            res.writeHead(200,{'Contenct-Type':'application/json'}),
            res.end(JSON.stringify({message:'product not found'}))  
        }else
        {
            const body =await getPostData(req)
            const {title,price}=JSON.parse(body)
    
            const productData =
            {
                title:title||product.title,
                price:price||product.price
            }
            const updateProduct= await Product.update(id,productData)
            res.writeHead(201,{'Content-Type':'appliction/json'})
            return res.end(JSON.stringify(updateProduct))
        
        }
    }catch(error)
    {
        console.log(error)
    }
}
async function deleteProduct(req,res, id)
{
    try
    {
        const product=await Product.findById(id)
        if(!product)
        {
            res.writeHead(200,{'Contenct-Type':'application/json'}),
            res.end(JSON.stringify({message:'product not found'}))  
        }else
        {
            await Product.remove(id)
            res.writeHead(200,{'Contenct-Type':'application/json'}),
            res.end(JSON.stringify({message:`product ${id} removed`}))
        }
    }catch(error)
    {
        console.log(error)
    }
}

module.exports=
{
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}