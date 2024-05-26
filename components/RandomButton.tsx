"use client";

import { ReactEventHandler, useState } from "react";

export default function RandomButton() {
  const [collection, setCollection] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollection(e.target.value);
  };

  async function randomFunc() {
    let x = await fetch("http://localhost:3001/api");
    console.log(collection);
  }

  return (
    <div>
      <input
        type="text"
        value={collection}
        onChange={(e) => handleInputChange(e)}
      ></input>
      <button onClick={randomFunc}>random button</button>
    </div>
  );
}
