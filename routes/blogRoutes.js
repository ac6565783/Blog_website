const express = require('express');
const { getAllBlogController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require("../controllers/blogController");

//router object
const router = express.Router()

//routes
//GET || all blogs
router.get('/all-blog', getAllBlogController)

//POST || create blogs
router.post('/create-blog', createBlogController)

//PUT || update blogs
router.put('/update-blog/:id', updateBlogController)

//GET || single blog details
router.get('/get-blog/:id', getBlogByIdController)

//DELETE || delete blogs
router.delete('/delete-blog/:id', deleteBlogController)


//Get || user blog
router.get('/user-blog/:id', userBlogController);

module.exports = router;