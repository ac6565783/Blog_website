import * as React from 'react';
import axios from 'axios';
import toast from "react-hot-toast"
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import CardActions from "@mui/material"
// import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
// import EditIcon from '@mui/icons-material/Edit';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function BlogCard({ title, description, image, username, time, id, isUser }) {
    const navigate = useNavigate()
    const handleEdit = () => {
        navigate(`/blog-details/${id}`)
    };
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/v1/blogs/delete-blog/${id}`)
            if (data?.success) {
                toast.success('blog deleted')
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Card sx={{
            width: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: "10px 10px 20px #ccc", ":hover:": {
                boxShadow: "10px 10px 20px #ccc",
            }
        }}>
            {isUser && (
                <Box display={"flex"}>
                    <IconButton sx={{ marginLeft: "auto" }} onClick={handleEdit}><ModeEditIcon color='info' /></IconButton>
                    <IconButton onClick={handleDelete}><DeleteIcon color='error' /></IconButton>
                </Box>
            )}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {username}
                    </Avatar>
                }
                title={username}
                subheader={time}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h4" color="text.secondary">
                    Title:{title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Description:{description}
                </Typography>
            </CardContent>

        </Card>
    );
}