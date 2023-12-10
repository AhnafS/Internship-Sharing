import { React, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { getAllUsers } from "../api-service";
import Divider from "@mui/material/Divider";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: 400,
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.`;

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const populateAllUsers = async () => {
      const res = await getAllUsers();
      setAllUsers(res.resultArray);
    };

    populateAllUsers();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
      <Typography variant="h3" align="center" sx={{ marginBottom: "30px" }}>
        All Users
      </Typography>
      {allUsers?.map((user) => {
        const { documentName, internshipArrayLength } = user;
        return (
          <Item
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              divider={<Divider orientation="vertical" flexItem />}
              justifyContent="space-evenly"
            >
              <Typography variant="h4" gutterBottom>
                {internshipArrayLength}
              </Typography>
              <Typography noWrap>{documentName}</Typography>
            </Stack>
          </Item>
        );
      })}
    </Box>
  );
}
