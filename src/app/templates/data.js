// ExampleComponent.jsx
import React, { useContext } from "react";
import { ReadContext } from "../app/GenComponents/ReadContext";

export default function loadPortfolioData() {
  const { userData } = useContext(ReadContext);

  const portfolioData = userData?.data;

  console.log("portfolioData:", portfolioData);

  return <div>{JSON.stringify(portfolioData)}</div>;

}
