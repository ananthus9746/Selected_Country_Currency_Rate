import PriceSection from "./PriceSection";

function App() {
  return (
    <>
      <h3 style={{ color: "green" }}>
        View Selected Country Currency rate and base Currency is Oman rial
      </h3>
      <div style={{backgroundColor:"black",borderRadius:"15px",padding:"10px"}}>
        <PriceSection />
      </div>
    </>
  );
}

export default App;
