import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../styles/index.css";
import Logo from "../images/metastash.png";
import Discord from "../images/discord.svg";
import Twitter from "../images/twitter.svg";
import Github from "../images/github.svg";

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
        <img src={Logo} height="58" />
      </div>
      <div className="icons">
        <a className="icon" href="https://github.com/CorradoRossi/metastash">
          <img src={Github} height="27" />
        </a>
        <a className="icon" href="https://twitter.com/metastash">
          <img src={Twitter} height="32" />
        </a>
        <a className="icon" href="https://discord.gg/U2sKKjqZ2n">
          <img src={Discord} height="32" />
        </a>
      </div>
    </main>
  );
}

export default Index;
