const express=require('express')
const router=express.Router()
const {getALLMovies,getMovieById}=require('../controller/moviesController')


router.get('/movies',getALLMovies)
router.get('/movies/:id',getMovieById)

module.exports=router;