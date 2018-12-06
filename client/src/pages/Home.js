import React from "react";
import styled from "styled-components";

const _Home = styled.section.attrs({
  className: "pr3 blue bg-yellow"
})``;

const Home = ({ listings }) => {
  return <_Home>{listings.toString()}</_Home>;
};

export default Home;
