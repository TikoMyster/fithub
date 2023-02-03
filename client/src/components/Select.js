import React, { useRef, useState } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
export default function SearchInput({ handleSearch }) {
  const [value, setValue] = useState("");

  return (
    <div
      className="container-fluid d-flex justify-content-center"
      style={{ marginTop: "2rem" }}
    >
      <Select
        placeholder="Select a body part…"
        onChange={(e, newValue) => setValue(newValue)}
        sx={{ minWidth: 160 }}
      >
        <Option value="back">Back</Option>
        <Option value="chest">Chest</Option>
        <Option value="shoulders">Shoulders</Option>
        <Option value="cardio">Cardio</Option>
      </Select>
      <Button onClick={() => handleSearch(value)}>Search</Button>
    </div>
  );
}
