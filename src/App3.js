import React, { useState, useEffect } from "react";
import "./app.css";

const BB84Form = () => {
  const [aliceBits, setAliceBits] = useState(
    Array.from({ length: 7 }, () => Math.round(Math.random()))
  );
  const [aliceBases, setAliceBases] = useState(
    Array.from({ length: 7 }, () => (Math.random() < 0.5 ? "+" : "x"))
  );
  const [aliceSends, setAliceSends] = useState(
    Array.from({ length: 7 }, () => "")
  );
  const [bobBases, setBobBases] = useState(
    Array.from({ length: 7 }, () => (Math.random() < 0.5 ? "+" : "x"))
  );
  const [bobMeasures, setBobMeasures] = useState(
    Array.from({ length: 7 }, () => "")
  );
  const [sharedKey, setSharedKey] = useState("");

  const handleAliceSendChange = (index, value) => {
    const updatedAliceSends = [...aliceSends];
    updatedAliceSends[index] = value;
    setAliceSends(updatedAliceSends);
    calculateSharedKey();
  };

  const handleBobMeasureChange = (index, value) => {
    const updatedBobMeasures = [...bobMeasures];
    updatedBobMeasures[index] = value;
    setBobMeasures(updatedBobMeasures);
    calculateSharedKey();
  };

  const calculateSharedKey = () => {
    const calculatedSharedKeys = aliceBases.map((aliceBasis, index) => {
      if (
        (aliceBasis === "+" && bobBases[index] === "+") ||
        (aliceBasis === "x" && bobBases[index] === "x")
      ) {
        if (
          (aliceSends[index] === "arrow_up" &&
            bobMeasures[index] === "arrow_up") ||
          (aliceSends[index] === "arrow_northeast" &&
            bobMeasures[index] === "arrow_northeast")
        ) {
          return "0";
        } else if (
          (aliceSends[index] === "arrow_right" &&
            bobMeasures[index] === "arrow_right") ||
          (aliceSends[index] === "arrow_southeast" &&
            bobMeasures[index] === "arrow_southeast")
        ) {
          return "1";
        }
      }
      return "-";
    });

    setSharedKeys(calculatedSharedKeys.join(""));
  };

  const [inputsGenerated, setInputsGenerated] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [sharedKeys, setSharedKeys] = useState(
    Array.from({ length: 7 }, () => "")
  );

  const generateRandomInputs = () => {
    const newAliceBits = Array.from({ length: 7 }, () =>
      Math.round(Math.random())
    );
    const newAliceBases = Array.from({ length: 7 }, () =>
      Math.random() < 0.5 ? "+" : "x"
    );
    setAliceBits(newAliceBits);
    setAliceBases(newAliceBases);
    setAliceSends(Array.from({ length: 7 }, () => ""));
    setBobBases(
      Array.from({ length: 7 }, () => (Math.random() < 0.5 ? "+" : "x"))
    );
    setBobMeasures(Array.from({ length: 7 }, () => ""));
    setSharedKey(""); //Clear the shared key
    setInputsGenerated(true);

    setGenerationCount(generationCount + 1);
  };

  useEffect(() => {
    generateRandomInputs();
  }, []);

  useEffect(() => {
    calculateSharedKey(); // Calculate shared key whenever inputs change
  }, [aliceBases, bobBases, aliceSends, bobMeasures]);

  return (
    <div className="container">
      <button onClick={generateRandomInputs}>Generate</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Alice's random bit</th>
            <th>Alice's random sending basis</th>
            <th>Photon polarization Alice sends</th>
            <th>Bob's random measuring basis</th>
            <th>Photon polarization Bob measures</th>
            <th>PUBLIC DISCUSSION OF BASIS</th>
            <th>Shared secret key</th>
          </tr>
        </thead>
        <tbody>
          {aliceBits.map((bit, index) => (
            <tr key={index}>
              <td>{bit}</td>
              <td>{aliceBases[index]}</td>
              <td>
                <button
                  className={aliceSends[index] === "arrow_up" ? "selected" : ""}
                  onClick={() => handleAliceSendChange(index, "arrow_up")}
                >
                  ↑
                </button>
                <button
                  className={
                    aliceSends[index] === "arrow_right" ? "selected" : ""
                  }
                  onClick={() => handleAliceSendChange(index, "arrow_right")}
                >
                  →
                </button>
                <button
                  className={
                    aliceSends[index] === "arrow_southeast" ? "selected" : ""
                  }
                  onClick={() =>
                    handleAliceSendChange(index, "arrow_southeast")
                  }
                >
                  ↘
                </button>
                <button
                  className={
                    aliceSends[index] === "arrow_northeast" ? "selected" : ""
                  }
                  onClick={() =>
                    handleAliceSendChange(index, "arrow_northeast")
                  }
                >
                  ↗
                </button>
              </td>
              <td>{bobBases[index]}</td>
              <td>
                <button
                  className={
                    bobMeasures[index] === "arrow_up" ? "selected" : ""
                  }
                  onClick={() => handleBobMeasureChange(index, "arrow_up")}
                >
                  ↑
                </button>
                <button
                  className={
                    bobMeasures[index] === "arrow_right" ? "selected" : ""
                  }
                  onClick={() => handleBobMeasureChange(index, "arrow_right")}
                >
                  →
                </button>
                <button
                  className={
                    bobMeasures[index] === "arrow_southeast" ? "selected" : ""
                  }
                  onClick={() =>
                    handleBobMeasureChange(index, "arrow_southeast")
                  }
                >
                  ↘
                </button>
                <button
                  className={
                    bobMeasures[index] === "arrow_northeast" ? "selected" : ""
                  }
                  onClick={() =>
                    handleBobMeasureChange(index, "arrow_northeast")
                  }
                >
                  ↗
                </button>
              </td>
              <td></td>
              {/* <td>{sharedKey}</td> */}
              <td className="table-bordered"></td>
              {/* <td>{index === aliceBits.length - 1 ? sharedKey : ""}</td> */}
              <td>{sharedKeys[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BB84Form;
