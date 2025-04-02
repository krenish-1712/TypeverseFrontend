import React from "react";
import { useState,useEffect } from "react";
import {Header} from '../Components/Header'
import Background from "../assets/img/backgroound.png";
import {Box,Typography,styled} from "@mui/material";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import about from '../assets/img/about4.png'
import { useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";


const AnimatedImage = styled("img")({
  animation: "updown 3s linear infinite",
  "@keyframes updown": {
    "0%": { transform: "translateY(-20px)" },
    "50%": { transform: "translateY(20px)" },
    "100%": { transform: "translateY(-20px)" },
  },
});

const About = () => {

  let navigate = useNavigate()
  const [firstloader, setfirstloader] = useState(true);
  

  let sec = 0;
  let u = setInterval(() => {
    if (sec === 1) {
      setfirstloader(false);
      clearInterval(u);
    } else {
      sec++;
    }
  }, 1000);

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/");
    }
  });
  
  return firstloader ? (
    <Box className="d-flex align-items-center justify-content-center" sx={{width:'100%',height:'100vh'}}>
      <PuffLoader color="#ff00ef" />
    </Box>
  ) : (
   <>
     <Header/>
    
    <div
      style={{
        color: "white",
        padding: "50px 100px",
        backgroundImage: `url(${Background})`,
        width: "100%",
        height: "fit-content",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <div className="row" style={{paddingTop:'70px'}}>
        <div className="col-6 d-flex align-items-center" style={{fontSize:'25px'}}>
        <Box sx={{width:'100%',margin:'auto',boxShadow:'#61bffb -2px -2px 5px ',fontSize:'25px',backgroundColor: "rgba(0, 0, 0, 0.8)", backdropFilter: 'blur(1px)', padding: "20px",   borderRadius: "10px"}}>
          Welcome to Typeverse, the ultimate platform for improving your typing
          speed and accuracy! Whether you're a beginner looking to build
          confidence or a professional aiming to refine your skills, our typing
          test is designed to help you track progress, challenge yourself, and
          become a faster, more efficient typist.
        </Box>
        </div>
        <div className="col-6 d-flex justify-content-center">
          <AnimatedImage src={about} style={{width:'400px'}}/>
        </div>
      </div>

      <Typography className="mt-5">

    <div className="d-flex ">
    <ContactSupportIcon sx={{fontSize:'40px',marginRight:'7px'}}/>
    <h2 className="mb-4">Why Choose Us?</h2>
    </div>
      <ul style={{listStyle:'none', display:'flex',flexDirection:'column',gap:'20px',fontSize:'20px'}}>
        <li>
          ✅ Accurate WPM & CPM Tracking – We calculate your words per minute
           and characters per minute with precision, counting only
          correctly typed words and characters.
        </li>
        <li>
          ✅ Mistake Analysis – See where you went wrong! Our test highlights
          errors, helping you learn from mistakes and improve over time.
        </li>
        <li>
          ✅ Local Progress Storage – Your test results (time, WPM, CPM, and
          mistakes) are saved in your browser’s local storage, so you can track
          your performance every time you visit.
        </li>
        <li>
          ✅ No Repetitive Texts – Every test presents a fresh set of words and
          sentences, ensuring a dynamic and engaging typing experience.
        </li>
        ✅ Simple & Distraction-Free – Our clean interface lets you focus solely
        on typing, free from unnecessary distractions.
      </ul>
      </Typography>

     <div className="d-flex mt-5 pt-3">
     <KeyboardDoubleArrowRightIcon sx={{fontSize:'40px',marginRight:'7px'}}/>
      <Typography sx={{textShadow:'1px 1px 2px skyblue'}} className="fs-2">
      Start Typing Today! Take a test now and see how fast you can type! Keep
      practicing, track your progress, and challenge yourself to reach new
      speeds. Happy Typing!
      </Typography>
     </div>
    </div>
   </>
  );
};

export default About;
