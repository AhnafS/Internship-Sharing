import { React, useState } from "react";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const Home = () => {
  const [isFormActive, setIsFormActive] = useState(false);
  const [allInternships, setAllInternships] = useState([]);

  return (
    <Container maxWidth="lg" sx={{ position: "relative" }}>
      <Button variant="contained" sx={{ position: "", top: 0, right: 0 }}>
        Add Internship
      </Button>
      <Stack spacing={2} sx={{ marginTop: "5em" }}>
        {allInternships.length == 0 && (
          <Item elevation={3}>
            No Internships At The Moment, You Can Add It By Pressing The 'Add
            Internship' Button Above
          </Item>
        )}
      </Stack>
    </Container>
  );
};

export default Home;
