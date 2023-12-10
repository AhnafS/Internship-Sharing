import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInternships } from "../api-service";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import ApplicationCard from "../components/ApplicationCard";

const Share = () => {
  const { email } = useParams();
  const [allInternships, setAllInternships] = useState([]);

  useEffect(() => {
    const fillInternshipState = async () => {
      const res = await getInternships(email);
      console.log(allInternships);
      console.log(res);
      setAllInternships(res.internships);
    };

    fillInternshipState();
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3">{email} Internships:</Typography>
      <Stack
        spacing={2}
        sx={{ marginTop: "5em" }}
        useFlexGap
        flexWrap="wrap"
        direction="row"
      >
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

export default Share;
