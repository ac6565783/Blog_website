const mongoose = require('mongoose');
const blogModel = require('../models/blogModels');
const userModel = require('../models/userModels');
//const { use } = require('../routes/userRoutes');

//get All blogs
exports.getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: 'No blog found'
            });
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: 'All blog list',
            blogs
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error while getting the user',
            error
        })
    }
}

//create blog
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body
        //validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all the fields'
            });
        }
        const existingUser = await userModel.findById(user)
        //validation
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'unable to find user'
            })
        }
        const newBlog = new blogModel({ title, description, image, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        return res.status(200).send({
            success: true,
            message: 'Blog created',
            newBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while creating blog',
            error
        })
    }
}

//update blog
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, image } = req.body
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({
            success: true,
            message: 'Blog updated',
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while updating',
            error
        })
    }
}

//single blog detail
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(404).send({
                success: 'false',
                messsage: 'blog not found'
            })
        }
        return res.status(200).send({
            succes: 'true',
            message: 'fetch single blog',
            blog,
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'error while getting the blog',
            error
        })
    }
}

//delete blog
exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: 'blog Deleted',
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: "false",
            message: 'Error while deleting blog',
            error
        })
    }
};

//GET USR BLG
exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "user blog not found with this id"
            });
        }
        return res.status(200).send({
            success: true,
            message: "user blogs",
            userBlog
        });
    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success: false,
            message: "error in user blog",
            error
        })
    }
}