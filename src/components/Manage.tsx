import { useState } from "react";

export default function Manage() {
  const [isShown, setIsShown] = useState(false);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        className="text-5xl text-white absolute right-5 top-0 cursor-pointer"
        onClick={() => setIsShown(!isShown)}
      >
        ...
      </div>
      {isShown && (
        <div
          className="absolute right-10 top-15 bg-white text-black py-1 px-1 rounded-lg shadow-lg"
          onClick={() => setIsShown(false)}
        >
          <div className="text-xl my-1 hover:bg-gray-200 cursor-pointer p-2">
            Get QR
          </div>
          <div className="text-xl my-1 hover:bg-gray-200 cursor-pointer p-2">
            Change model
          </div>
          <div className="text-xl my-1 hover:bg-gray-200  cursor-pointer p-2">
            Delete
          </div>
        </div>
      )}
      <iframe
        src="http://127.0.0.1:5500/complete/lecture3_12%20copy/index.html"
        frameBorder={0}
        style={{ height: "85%", width: "100%" }}
      ></iframe>
      <div
        style={{
          height: "15%",
          width: "100%",
          border: "1px solid #ccc",
          overflowY: "auto",
          display: "flex",
          alignItems: "center",
          paddingLeft: "40px",
          paddingRight: "40px",
          gap: "40px",
        }}
      ></div>
    </div>
  );
}
