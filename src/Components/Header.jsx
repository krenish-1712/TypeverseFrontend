import { useState, useEffect } from "react";
import {AppBar,Toolbar,IconButton,Typography,Button,Box,Drawer,List,ListItem,ListItemButton,} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  function logout(a) {
    navigate("/login");
    localStorage.removeItem("Token");
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled ? "rgba(0, 0, 0, 0.9)" : "transparent",
          transition: "0.3s",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
          }}
        >
          <Box component="a" href="/" sx={{ width: "10%" }}>
            <h2>Typeverse</h2>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {["home", "about"].map((section) => (
              <Button
                key={section}
                onClick={() => navigate(`/${section}`)}
                sx={{
                  color:
                    location.pathname === `/${section}`
                      ? "white"
                      : "rgba(255, 255, 255, 0.75)",
                  mx: 2,
                  fontSize: "18px",
                  "&:hover": { opacity: 1 },
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
              {[navIcon1, navIcon2, navIcon3].map((icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    bgcolor: "rgba(217, 217, 217, 0.1)",
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <img src={icon} alt={`Social ${index}`} width="20px" />
                </IconButton>
              ))}
            </Box> */}

            <Button
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                ml: 2,
                px: 3,
                py: 1,
                "&:hover": { backgroundColor: "#fff", color: "#121212" },
              }}
              onClick={() => logout("demo")}
            >
              Log out
            </Button>
          </Box>

          <IconButton
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" }, color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {["home", "about"].map((section) => (
            <ListItem key={section} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`/${section}`);
                  handleDrawerToggle();
                }}
              >
                <Typography
                  color={
                    location.pathname === `/${section}` ? "primary" : "inherit"
                  }
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
