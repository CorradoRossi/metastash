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
    </main>
  );
}

export default Index;
