const connectToDB = require('../db')

const getALLMovies=async(req,res)=>{
    const db=await connectToDB()
    const moviesCollection=db.collection('movies')
    try{
        const result=await moviesCollection.find().toArray()
        res.json(result)
    }catch(err){
        console.log(err)
    }
    
}

const getMovieById=async(req,res)=>{
    const db=await connectToDB()
    const moviesCollection=db.collection('movies')
    const videoId=req.params.id
    try{
        const result=await moviesCollection.find({'_id':videoId}).toArray()
        
        res.json(result)
    }catch(err){
        console.log(err)
    }
    
}



module.exports={getALLMovies,getMovieById}
