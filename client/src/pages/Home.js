import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(GET_USER);
  // keep the question mark
  const userData = data?.user;
  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      {userData && <h1>Let's go {userData.username} !</h1>}
      <h2 className="mt-5">What do you want to get done today? </h2>
    </div>
  );
};

export default Home;
