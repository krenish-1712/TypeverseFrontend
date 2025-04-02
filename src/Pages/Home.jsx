import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import { styled } from "@mui/system";
import headerImg from "../assets/img/header-img.svg";
import bannerimg from "../assets/img/banner-bg.png";
import { Header } from "../Components/Header";
import { useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

const BannerContainer = styled(Box)(({ theme }) => ({
  marginTop: 0,
  padding: "200px 0 100px 0",
  backgroundImage: `url(${bannerimg})`,
  backgroundPosition: "top center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  textAlign: "left",
  [theme.breakpoints.down("md")]: {
    padding: "500px 0 80px 0",
    textAlign: "center",
  },
}));

const Tagline = styled(Typography)({
  fontWeight: 700,
  letterSpacing: "0.8px",
  padding: "8px 10px",
  background:
    "linear-gradient(90.21deg, rgba(170, 54, 124, 0.5) -5.91%, rgba(74, 47, 189, 0.5) 111.58%)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  fontSize: "20px",
  marginBottom: "16px",
  display: "inline-block",
  color: "white",
  fontSynthesisWeight: "800",
});

const Title = styled(Typography)({
  fontSize: "65px",
  fontWeight: 700,
  letterSpacing: "0.8px",
  lineHeight: 1,
  marginBottom: "20px",
  color: "white",
});

const Description = styled(Typography)({
  color: "#B8B8B8",
  fontSize: "18px",
  letterSpacing: "0.8px",
  lineHeight: "1.5em",
  width: "96%",
});

const AnimatedImage = styled("img")({
  animation: "updown 3s linear infinite",
  "@keyframes updown": {
    "0%": { transform: "translateY(-20px)" },
    "50%": { transform: "translateY(20px)" },
    "100%": { transform: "translateY(-20px)" },
  },
});

export const Home = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const [firstloader, setfirstloader] = useState(true);
  const toRotate = [
    "want to be a Typing Expert?",
    "want to increse Typing speed?",
    "wnat to grow Typing skill?",
  ];
  const period = 2000;
  let navigate = useNavigate();

  let sec = 0;
  let u = setInterval(() => {
    if (sec == 1) {
      setfirstloader(false);
      clearInterval(u);
    } else {
      sec++;
    }
  }, 1000);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(100);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  let test = async () => {
    await navigate("/test");
  };

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
    <BannerContainer id="home" height="100vh">
      <Container>
        <Header />
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              <Tagline>Welcome to Typeverse</Tagline>
              <Title>
                {`Hello! Do you`}{" "}
                <span className="txt-rotate">
                  <span className="wrap">{text}</span>
                </span>
              </Title>
              <Description>
                Typing is an essential skill in the digital age. Faster typing
                boosts productivity and efficiency. Regular practice improves
                accuracy and speed. Challenge yourself with engaging exercises.
                Master the keyboard and type with confidence!
              </Description>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  mt: 4,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "20px",
                  letterSpacing: "0.8px",
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #fff",
                  "&:hover": {
                    color: "#121212",
                    backgroundColor: "#fff",
                  },
                }}
                onClick={() => test()}
              >
                Start Typing
                <ArrowRightAlt sx={{ ml: 1, transition: "0.3s" }} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedImage
              src={headerImg}
              alt="Header Img"
              style={{ width: "600px", paddingLeft: "100px" }}
            />
          </Grid>
        </Grid>
      </Container>
    </BannerContainer>
  );
};
