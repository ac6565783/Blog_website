import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
export default function CreateBlog() {
    const id = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    })
    //input change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    //form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/blogs/create-blog', {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            })
            if (data?.success) {
                toast.success('Blog created')
                navigate('/my-blogs')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box width={"50%"} border={3} borderRadius={5} padding={3} margin="auto" marginTop={5} boxShadow={'10px 10px 20px'} display={'flex'} flexDirection={'column'}>
                    <Typography variant="h2" textAlign={'center'} fontWeight={"bold"} padding={3} color={"gray"}>Create a post</Typography>
                    <InputLabel sx={{ mt: 1, mb: 1, fontSize: "20px", fontWeight: "bold" }}>Title</InputLabel>
                    <TextField name="title" value={inputs.title} onChange={handleChange} margin='normal' variant="outlined" required></TextField>
                    <InputLabel sx={{ mt: 1, mb: 1, fontSize: "20px", fontWeight: "bold" }}>Description</InputLabel>
                    <TextField name="description" value={inputs.description} onChange={handleChange} margin='normal' variant="outlined" required></TextField>
                    <InputLabel sx={{ mt: 1, mb: 1, fontSize: "20px", fontWeight: "bold" }}>Image URL</InputLabel>
                    <TextField name="image" value={inputs.image} onChange={handleChange} margin='normal' variant="outlined" required></TextField>
                    <Button type="submit" color="primary" variant="contained">SUBMIT</Button>
                </Box>
            </form>
        </div>
    )
}
