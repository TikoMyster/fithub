import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";


const Home = () => {
  const { loading, data } = useQuery(GET_USER);
  // keep the question mark
  const userData = data?.user;
  return (
    <div
      className="d-flex flex-column align-items-left justify-content-center backgroundHome"
      style={{ height: "90vh" }}
    >
      {userData && <h1 className="color" >Let's go, {userData.username}!</h1>}
      <h2 className="mt-5 color">What do you want to get done today? </h2>
    </div>
  );
};

export default Home;
