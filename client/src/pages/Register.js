import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from '@mui/material'
import axios from 'axios'
import toast from "react-hot-toast"
export default function Register() {
    const navigate = useNavigate();
    //state
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
    })
    //Hnadle input change
    const handleChange = (e) => {
        //e is an event object
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    //form handle
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/user/register', { username: inputs.name, email: inputs.email, password: inputs.password });
            if (data.success) {
                toast.success("User Register successfully");
                navigate("/login");
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={450}
                    display="flex"
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={5}
                    padding={5}
                    borderRadius={5}
                    // border="1px solid #cddecd"
                    boxShadow="10px 10px 20px #ccc"
                >
                    <Typography
                        variant='h4'
                        sx={{ textTransform: "uppercase" }}
                        padding={3}
                        textAlign={'center'}>
                        Register
                    </Typography>
                    <TextField
                        placeholder='name'
                        name='name'
                        value={inputs.name}
                        margin='normal'
                        type='text'
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        placeholder='email'
                        name='email'
                        value={inputs.email}
                        margin='normal'
                        type='email'
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        placeholder='password'
                        name='password'
                        value={inputs.password}
                        margin='normal'
                        type='password'
                        required
                        onChange={handleChange}
                    />
                    <Button type='submit' sx={{ borderRadius: 3, marginTop: 3 }} variant='contained' color='primary'>Submit</Button>
                    <Button type='submit' onClick={() => {
                        navigate("/login")
                    }} sx={{ borderRadius: 3, marginTop: 3 }} color='primary'>Already Registerd ? Please Login</Button>
                </Box>
            </form>
        </>
    )
}
