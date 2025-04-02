import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import image from '../assets/img/dialog.jpg'
import { styled } from '@mui/material/styles';
import backimg from '../assets/img/footer-bg.png'
import svg from '../assets/img/contact-img.svg'



const Image = styled(Box)(({ theme }) => ({
  marginTop: 0,
  backgroundImage: `url(${image})`,
  backgroundPosition: "top center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  borderRadius:'25px',
  textAlign: "left",
  [theme.breakpoints.down("md")]: {
    padding: "100px 0 80px 0",
    textAlign: "center",
  },
}));

const SignUp = () => {
  let navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name : '',
      contact : '',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      if (!values.email || !values.password || !values.name || !values.contact) {
        toast.warning("Please fill all the fields!");
        return;
      }
    
      try {
        let res = await axios.post("https://typeversebackend.onrender.com/authentication/signup", values);
        localStorage.setItem('Token', res.data.token);
        
        toast.success("Sign up successfully!");
    
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        toast.error("Signup failed! Please try again.");
        console.error(error);
      }
    }    
});

  let login = () =>{
    navigate('/login')
  }

  return (
  
    <div style={{ width: '100%',height:'100vh',backgroundImage:`url(${backimg})`,backgroundRepeat: "no-repeat",backgroundSize:'cover',gap:'40px'}} class='d-flex align-items-center justify-content-center'>
       <img src={svg} style={{width:'600px',}} alt="" />
    <Image>
      <Box className='d-flex flex-column align-items-center justify-content-evenly' 
        sx={{width: '500px', height: 'fit-content',padding:'50px 10px',border: '2px solid #9d3585',borderRadius:'25px',boxShadow:'0 0 5px #9d3585'}}>
        <Typography sx={{ fontSize: '30px',color:'white',textShadow:'1px 1px 2px #9d3585',fontWeight:'600' }} >
          Sign up
        </Typography>
        <br />
        <form onSubmit={formik.handleSubmit}>
        <Box
          className=' d-flex flex-column align-items-center justify-content-center'
          sx={{ '& > :not(style)': { m: 1, width: '400px'} }}
          noValidate
          autoComplete="off"
        >
          <TextField
              id="outlined-basic"
              name="name"
              label="Name"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.name}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white', // Set text color when not focused
                  '& fieldset': {
                    borderColor: 'white', // Border color when not focused
                  },
                  '&:hover fieldset': {
                    borderColor: '#9d3585', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#9d3585', // Border color when focused
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white', // Input text color when not focused
                },
                '& .MuiInputLabel-root': {
                  color: 'white', // Label color when not focused
                  '&.Mui-focused': {
                    color: '#9d3585', // Label color when focused
                  },
                },paddingBottom:'10px'
              }}
            /> 
           <TextField
            id="outlined-basic"
            type="number"
            name="contact"
            label="Contact"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.contact}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
            sx={{
              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                display: 'none',
              },
              '& input[type=number]': {
                MozAppearance: 'textfield', // For Firefox
              },
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: '#9d3585' },
                '&.Mui-focused fieldset': { borderColor: '#9d3585' },
              },
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': { color: '#9d3585' },
              },
              paddingBottom: '10px',
            }}
          />

            <TextField
              id="outlined-basic"
              type='email'
              name="email"
              label="Email"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.email}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white', // Set text color when not focused
                  '& fieldset': {
                    borderColor: 'white', // Border color when not focused
                  },
                  '&:hover fieldset': {
                    borderColor: '#9d3585', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#9d3585', // Border color when focused
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white', // Input text color when not focused
                },
                '& .MuiInputLabel-root': {
                  color: 'white', // Label color when not focused
                  '&.Mui-focused': {
                    color: '#9d3585', // Label color when focused
                  },
                },paddingBottom:'10px'
              }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type='password'
              name='password'
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.password}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white', // Set text color when not focused
                  '& fieldset': {
                    borderColor: 'white', // Border color when not focused
                  },
                  '&:hover fieldset': {
                    borderColor: '#9d3585', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#9d3585', // Border color when focused
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white', // Input text color when not focused
                },
                '& .MuiInputLabel-root': {
                  color: 'white', // Label color when not focused
                  '&.Mui-focused': {
                    color: '#9d3585', // Label color when focused
                  },
                },paddingBottom:'10px'
              }}
            />
             <FormControlLabel
              control={<Checkbox value="remember" color="primary" sx={{color:'white'}} />}
              label="Agree to terms and conditions"
             className='text-white'
              
            />
          <p className='fs-6 text-white'>Have an account?<button onClick={()=>login()} type='button'  style={{backgroundColor:'transparent', border:'none',color:'skyblue'}}>Log in</button></p>
        <Button variant="contained" sx={{ width: '400px',background:'linear-gradient(#9d3585,rgb(164, 0, 186))' }} type="submit">Sign up</Button>
        </Box>
      </form>
    </Box>
     <ToastContainer />
    </Image>
    </div >
  
  )
}
export default SignUp
