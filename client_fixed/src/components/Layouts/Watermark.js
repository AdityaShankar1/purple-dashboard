const Watermark = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 0,
      pointerEvents: "none",
      opacity: 0.3,
    }}
  >
   <img
  src="/logoPesu.png"
  alt="Watermark"
  style={{
    width: "700px",
    maxWidth: "90vw",
    objectFit: "contain",
    filter: "brightness(200%) opacity(0.2)", // ✅ lightens and fades the image
  }}
/>

  </div>
);

export default Watermark;
