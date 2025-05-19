export default function Manage() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <iframe
        src="http://127.0.0.1:5500/complete/lecture3_12/index.html"
        frameBorder={0}
        style={{ height: "85%", width: "100%" }}
      ></iframe>
      <div
        style={{
          height: "15%",
          width: "100%",
          backgroundColor: "#ccc",
          overflowY: "auto",
          display: "flex",
          alignItems: "center",
          paddingLeft: "40px",
          paddingRight: "40px",
          gap: "40px",
        }}
      >
        <div style={{ backgroundColor: "white", height: "50%" }}>Object1</div>
        <div style={{ backgroundColor: "white", height: "50%" }}>Object1</div>
        <div style={{ backgroundColor: "white", height: "50%" }}>Object1</div>
        <div style={{ backgroundColor: "white", height: "50%" }}>Object1</div>
      </div>
    </div>
  );
}
