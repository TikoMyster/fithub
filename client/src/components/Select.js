import React, { useState } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
export default function SearchInput({ handleSearch, setBodypart, bodypart }) {
  // const [value, setValue] = useState("");

  return (
    <div
      className="container-fluid d-flex justify-content-center"
      style={{ marginTop: "2rem" }}
    >
      <Select
        placeholder="Select a body part…"
        value={bodypart}
        onChange={(e, newValue) => setBodypart(newValue)}
        sx={{ minWidth: 160 }}
      >
        <Option value="back">Back</Option>
        <Option value="chest">Chest</Option>
        <Option value="shoulders">Shoulders</Option>
        <Option value="cardio">Cardio</Option>
      </Select>
      <Button
        style={{ color: "#000", backgroundColor: "#CEFF00" }}
        onClick={() => handleSearch(bodypart)}
      >
        Search
      </Button>
    </div>
  );
}
