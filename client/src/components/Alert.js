import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import * as React from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

export default function AlertComponent({ setShowAlert, login }) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        position: "fixed",
        zIndex: "10",
      }}
    >
      <Alert
        sx={{ alignItems: "flex-start", width: 200 }}
        startDecorator={React.cloneElement(<ReportIcon />, {
          sx: { mt: "2px", mx: "4px" },
          fontSize: "xl2",
        })}
        variant="soft"
        color="danger"
        endDecorator={
          <IconButton
            variant="soft"
            size="sm"
            color="danger"
            onClick={() => setShowAlert(false)}
          >
            <CloseRoundedIcon />
          </IconButton>
        }
      >
        <div>
          <Typography fontWeight="lg" mt={0.25}>
            Error
          </Typography>
          <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
            {login ? "Login Failed!" : "Signup Failed!"}
          </Typography>
        </div>
      </Alert>
    </Box>
  );
}
