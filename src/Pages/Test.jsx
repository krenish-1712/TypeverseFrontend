import React, { useState, useEffect } from "react";
import background from "../assets/img/backgroound.png";
import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";
import circle from "../assets/img/circle.png";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Background from "../assets/img/dialog.jpg";
import Resultimg from "../assets/img/contact-img.svg";
import { Header } from "../Components/Header";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";


const Test = () => {
  const [open, setOpen] = useState(false);
  const [firstloader, setfirstloader] = useState(true);

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

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const BackGroundd = styled(Box)(({ theme }) => ({
    marginTop: 0,
    backgroundImage: `url(${Background})`,
    backgroundPosition: "top center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      padding: "100px 0 80px 0",
      textAlign: "center",
    },
  }));

  const BackGround = styled(Box)(({ theme }) => ({
    marginTop: 0,
    padding: "50px 0 50px 0",
    backgroundImage: `url(${background})`,
    backgroundPosition: "top center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      padding: "500px 0 80px 0",
      textAlign: "center",
    },
  }));

  const [text, settext] = useState([]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [testHistory, setTestHistory] = useState([]);
  let [randomindex, setIndex] = useState(0);
  let [loader, setloader] = useState(false);
  const getData = async () => {
    try {
      setloader(true);
      let res = await axios.get("https://typeversebackend-lqac.onrender.com/paragraph/read");
      settext(res.data.data);
    } catch (error) {
      console.error("Error fetching data:",error.response?.data || error.message);
      settext("Failed to load paragraph.");
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    let index = Math.floor(Math.random() * text?.length);
    setIndex(index);
  }, [text]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setOpen(true);
      setIsRunning(false);
      saveTestResult();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("typingHistory");
    if (savedHistory) {
      setTestHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleChange = (e) => {
    if (!isRunning) setIsRunning(true);

    let val = e.target.value;
    let correct = 0;
    let errors = 0;
    let words = val.trim().split(" ");
    let correctWordCount = 0;

    for (let i = 0; i < val.length; i++) {
      if (val[i] !== " " && val[i] === text[randomindex]?.text[i]) {
        correct++;
      } else if (val[i] !== " ") {
        errors++;
      }
    }

    words.forEach((word, index) => {
      if (word === text[randomindex]?.text.split(" ")[index]) {
        correctWordCount++;
      }
    });

    setCorrectChars(correct);
    setMistakes(errors);
    setInput(val);
    setCorrectWords(correctWordCount);
  };

  const saveTestResult = () => {
    const newRecord = {
      time: 60 - timeLeft,
      wpm: correctWords,
      cpm: correctChars,
      mistakes,
    };
    const updatedHistory = [...testHistory, newRecord];
    setTestHistory(updatedHistory);
    localStorage.setItem("typingHistory", JSON.stringify(updatedHistory));
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
    <>
      <Header />
      <BackGround>
        <Typography
          className="text-center fw-bold text-white pt-5 pb-3"
          style={{ fontSize: "70px" }}
        >
          Welcome! <br />
          Test Your Speed
        </Typography>
        <br />
        <Box
          sx={{
            width: "1200px",
            margin: "auto",
            boxShadow: "#61bffb -2px -2px 3px",
            fontSize: "25px",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(1px)",
            padding: "20px",
            borderRadius: "10px",
            position:'relative',
          }}
        >
          <p
            className="text-center"
            style={{ lineHeight: "50px", wordSpacing: "10px" }}
          >
            {loader ? (
              <HashLoader
                style={{ width: "max-width", margin: "auto" }}
                color="#62c3fb"
              />
            ) : (
              text[randomindex]?.text.split("").map((char, index) => {
                let color =
                  input[index] === char
                    ? "green"
                    : input[index]
                    ? "red"
                    : "white";
                let underlineStyle =
                  index === input.length
                    ? {
                        textDecoration: "underline",
                        textDecorationColor: "#61bffb",
                        textDecorationThickness: "4px",
                        textUnderlineOffset: "6px",
                      }
                    : {};

                return (
                  <span key={index} style={{ color, ...underlineStyle }}>
                    {char}
                  </span>
                );
              })
            )}
          </p>
        </Box>
        <br /> <br />
        <Box sx={{ width: "1200px", margin: "auto" }}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            disabled={timeLeft === 0}
            style={{
              width: "1200px",
              color: "white",
              fontSize: "20px",
              borderRadius: "10px",
              padding: "20px 20px",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              outline: "none",
              border: "none",
              boxShadow: "rgb(218, 0, 218) 2px 2px 3px",
              position:'absolute',
              top:'600px',
              left:'160px',
              opacity:'0%'
            }}
            autoFocus
          />
        </Box>
        <Box
          sx={{
            width: "1200px",
            margin: "auto",
            color: "whitesmoke",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div style={{ position: "relative" }}>
            <img src={circle} alt="" width="210px" />
            <span
              style={{
                position: "absolute",
                left: "72px",
                top: "65px",
                textAlign: "center",
                fontSize: "27px",
                fontWeight: "700",
              }}
            >
              TIME <br /> {timeLeft}s
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <img src={circle} alt="" width="210px" />
            <span
              style={{
                position: "absolute",
                left: "70px",
                top: "65px",
                textAlign: "center",
                fontSize: "27px",
                fontWeight: "700",
              }}
            >
              WPM <br />
              {correctWords}
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <img src={circle} alt="" width="210px" />
            <span
              style={{
                position: "absolute",
                left: "75px",
                top: "65px",
                textAlign: "center",
                fontSize: "27px",
                fontWeight: "700",
              }}
            >
              CPM <br />
              {correctChars}
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <img src={circle} alt="" width="210px" />
            <span
              style={{
                position: "absolute",
                left: "41px",
                top: "65px",
                textAlign: "center",
                fontSize: "27px",
                fontWeight: "700",
              }}
            >
              MISTAKES <br />
              {mistakes}
            </span>
          </div>

          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <div style={{ backgroundColor: "black" }}>
              <BackGroundd>
                <DialogTitle
                  sx={{ m: 0, p: 2, color: "white", fontSize: "25px" }}
                  id="customized-dialog-title"
                >
                  Result
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={(theme) => ({
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                  })}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent
                  style={{
                    width: "600px",
                    height: "fit-content",
                    padding: "0px 20px",
                  }}
                >
                  <div
                    className="row text-white"
                    style={{
                      height: "250px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="col-4"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Resultimg} width={"200px"} alt="" />
                    </div>
                    <div className="col-8 ps-5 d-flex align-items-center flex-column gap-3">
                      <span
                        style={{
                          display: "flex",
                          width: "250px",
                          position: "relative",
                        }}
                      >
                        {" "}
                        <h4>Wpm</h4>{" "}
                        <h4 style={{ position: "absolute", left: "130px" }}>
                          :
                        </h4>{" "}
                        <h4 style={{ position: "absolute", left: "170px" }}>
                          {correctWords}
                        </h4>{" "}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          width: "250px",
                          position: "relative",
                        }}
                      >
                        {" "}
                        <h4>Cpm</h4>{" "}
                        <h4 style={{ position: "absolute", left: "130px" }}>
                          :
                        </h4>{" "}
                        <h4 style={{ position: "absolute", left: "170px" }}>
                          {correctChars}
                        </h4>{" "}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          width: "250px",
                          position: "relative",
                        }}
                      >
                        {" "}
                        <h4>Mistakes</h4>{" "}
                        <h4 style={{ position: "absolute", left: "130px" }}>
                          {" "}
                          :
                        </h4>{" "}
                        <h4 style={{ position: "absolute", left: "170px" }}>
                          {mistakes}
                        </h4>{" "}
                      </span>
                    </div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Try Again</Button>
                  {/* <Button onClick={handleClose}>Save Result</Button> */}
                </DialogActions>
              </BackGroundd>
            </div>
          </BootstrapDialog>
        </Box>
      </BackGround>
    </>
  );
};

export default Test;
