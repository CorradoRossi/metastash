import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../styles/index.css";

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
      <h1>Metastash</h1>
      <h2>
        Deployed by{" "}
        <a href="https://rssi.dev" target="_blank" rel="noreferrer noopener">
          @Metastash
        </a>
      </h2>
      <p>
        <a
          href="https://github.com/CorradoRossi/"
          target="_blank"
          rel="noreferrer noopener"
        >
          This project
        </a>{" "}
        is a <a href="https://www.rssi.dev/">Metastash</a> app
      </p>
    </main>
  );
}

export default Index;
