import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ApplicationCard = ({
  companyName,
  companyPosition,
  applicationLink,
  whenApplied,
  status,
}) => {
  return (
    <Card variant="outlined" style={{ maxWidth: 400, margin: "16px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {companyName}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {companyPosition}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          <strong>When Applied:</strong> {whenApplied}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Status:</strong> {status}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
          href={applicationLink}
        >
          Application Link
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
