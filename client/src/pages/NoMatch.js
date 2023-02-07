import React from "react";
import Button from "@mui/joy/Button";

import { useNavigate } from "react-router-dom";

const NoMatch = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ height: "90vh" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h1>404 Page Not Found</h1>
      {/* use navigate to go back to previous page */}
      <Button
        color="primary"
        onClick={() => navigate(-1)}
        style={{ marginTop: "2rem" }}
      >
        Go Back
      </Button>
    </div>
  );
};

export default NoMatch;
