import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../styles/index.css";
import logo from "../images/metastash.png";

function Index() {
  const [date, setDate] = useState(null);
  useEffect(() => {
    async function getDate() {
      const res = await fetch("/api/date");
      const newDate = await res.text();
      setDate(newDate);
    }
    getDate();
  }, []);
  return (
    <main>
      <Helmet>
        <title>Metastash</title>
      </Helmet>
      <div className="logo-wrapper">
        <h1>Metastash</h1>
        <img src={logo} height="60" />
      </div>
      <a href="https://discord.gg/U2sKKjqZ2n">Join the Discord</a>
    </main>
  );
}

export default Index;
