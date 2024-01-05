import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from "react-hot-toast"
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
export default function BlogDetails() {
    const [blog, setBlog] = useState({})
    const id = useParams().id
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({})
    //get blog details
    const getBlogDetails = async () => {
        try {
            const { data } = await axios.get(`/api/v1/blogs/get-blog/${id}`);
            if (data?.success) {
                setBlog(data?.blog);
                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getBlogDetails();
    }, [id])

    //input change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    //form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`/api/v1/blogs/update-blog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            })
            if (data?.success) {
                toast.success('Blog updated')
                navigate("/my-blogs")
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(blog)
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box width={"50%"} border={3} borderRadius={5} padding={3} margin="auto" marginTop={5} boxShadow={'10px 10px 20px'} display={'flex'} flexDirection={'column'}>
                    <Typography variant="h2" textAlign={'center'} fontWeight={"bold"} padding={3} color={"gray"}>update a post</Typography>
                    <InputLabel sx={{ mt: 1, mb: 1, fontSize: "20px", fontWeight: "bold" }}>Title</InputLabel>
                    <TextField name="title" value={inputs.title} onChange={handleChange} margin='normal' variant="outlined" required></TextField>
                    <InputLabel sx={{ mt: 1, mb: 1, fontSize: "20px", fontWeight: "bold" }}>Description</InputLabel>
                    <TextField name="description" value={inputs.description} onChange={handleChange} margin='normal' variant="outlined" required></TextField>
                    <InputLabel sx={{ mt: 1, mb: 1, fontSize: "20px", fontWeight: "bold" }}>Image URL</InputLabel>
                    <TextField name="image" value={inputs.image} onChange={handleChange} margin='normal' variant="outlined" required></TextField>
                    <Button type="submit" color="warning" variant="contained">UPDATE</Button>
                </Box>
            </form>
        </>
    )
}
