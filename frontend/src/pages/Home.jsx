import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { TextField, Typography } from "@mui/material";
import { useAuth } from "../auth";
import { addInternship, getInternships } from "../api-service";
import ApplicationCard from "../components/ApplicationCard";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const ApplicationForm = ({ addInternshipHandler }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyPosition: "",
    applicationLink: "",
    whenApplied: "",
    status: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    addInternshipHandler(formData);
    setFormData({
      companyName: "",
      companyPosition: "",
      applicationLink: "",
      whenApplied: "",
      status: "",
    });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" gutterBottom>
        Job Application Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Company Name"
          variant="outlined"
          fullWidth
          value={formData.companyName}
          onChange={handleChange("companyName")}
        />
        <TextField
          label="Company Position"
          variant="outlined"
          fullWidth
          value={formData.companyPosition}
          onChange={handleChange("companyPosition")}
        />
        <TextField
          label="Application Link"
          variant="outlined"
          fullWidth
          value={formData.applicationLink}
          onChange={handleChange("applicationLink")}
        />
        <TextField
          label="When Applied"
          variant="outlined"
          fullWidth
          value={formData.whenApplied}
          onChange={handleChange("whenApplied")}
        />
        <TextField
          label="Status"
          variant="outlined"
          fullWidth
          value={formData.status}
          onChange={handleChange("status")}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Stack>
  );
};

const Home = () => {
  const [isFormActive, setIsFormActive] = useState(false);
  const [allInternships, setAllInternships] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    const fillInternshipState = async () => {
      const res = await getInternships(user?.email);
      console.log(allInternships);
      console.log(res);
      setAllInternships(res.internships);
    };

    fillInternshipState();
  }, [loading]);

  const addInternshipHandler = async (data) => {
    await addInternship(user.email, data);
    setAllInternships([...allInternships, data]);
    setIsFormActive(false);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button
        variant="contained"
        sx={{ position: "", top: 0, right: 0, marginBottom: "3em" }}
        onClick={() => {
          setIsFormActive(!isFormActive);
          console.log(allInternships);
        }}
      >
        Add Internship
      </Button>
      {isFormActive && (
        <ApplicationForm addInternshipHandler={addInternshipHandler} />
      )}
      <Stack spacing={2} sx={{ marginTop: "5em" }}>
        {allInternships.length == 0 && (
          <Item elevation={3}>
            No Internships At The Moment, You Can Add It By Pressing The 'Add
            Internship' Button Above
          </Item>
        )}
        {allInternships?.map((item) => {
          const {
            applicationLink,
            companyName,
            companyPosition,
            status,
            whenApplied,
          } = item;
          return (
            <ApplicationCard
              applicationLink={applicationLink}
              companyName={companyName}
              companyPosition={companyPosition}
              status={status}
              whenApplied={whenApplied}
            />
          );
        })}
      </Stack>
    </Container>
  );
};

export default Home;
