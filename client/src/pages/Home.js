import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";

const Home = ({ height }) => {
  const { loading, data } = useQuery(GET_USER);
  // keep the question mark
  const userData = data?.user;
  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center text-white"
      style={{
        height: "90vh",
        backgroundImage: "url(/assets/bg-body.jpg)",
        backgroundSize: "cover",
      }}
    >
      {userData && (
        <h1
          style={{ fontSize: "4rem", fontWeight: 400 }}
          className="text-center"
        >
          Let's go {userData.username}!
        </h1>
      )}
      <h1
        style={{ fontSize: "4rem", fontWeight: 400 }}
        className="mt-5 text-center"
      >
        What do you want to get done today?{" "}
      </h1>
    </div>
  );
};

export default Home;
