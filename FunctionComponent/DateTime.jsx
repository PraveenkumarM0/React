import React, { useState } from "react";

function DateTime() {
  const [dateTime, setDateTime] = useState("");

  const showDateTime = () => {
    setDateTime(new Date().toLocaleString());
  }

  return (
    <div>
      <button onClick={showDateTime}>Click </button>
      {dateTime && <h2>{dateTime}</h2>}
    </div>
  )
}

export default DateTime