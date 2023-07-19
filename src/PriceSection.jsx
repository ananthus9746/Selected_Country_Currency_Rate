import { useState, useEffect } from "react";

function PriceSection() {
  const [baseCurrency, setBaseCurrency] = useState("OMR");
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [userCountry, setUserCountry] = useState("United States"); // Default country

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/6309575a279a197d281f6bc7/latest/${baseCurrency}`
        );
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
        console.log("exchangeRates..", exchangeRates);
        // Map of countries and their corresponding currencies (hard-coded)
        const countryCurrencyMap = {
          "United States": "USD",
          "United Arab Emirates": "AED",
          India: "INR",
          // Add more countries and currencies as needed
        };

        setSelectedCurrency(countryCurrencyMap[userCountry]);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [baseCurrency, userCountry]);

  const convertCurrency = (price) => {
    if (!exchangeRates || !price) {
      return "";
    }

    const rate = exchangeRates[selectedCurrency];
    const convertedPrice = price * rate;

    return convertedPrice.toFixed(2); // Adjust decimal places as needed
  };

  const productPrice = 1; // Example product price in the base currency (OMR)

  return (
    <div>
      <h3>Product Price:</h3>
      <p>Base Currency (OMR): {productPrice}</p>
      <label htmlFor="country">Select Country:</label>
      <select
        style={{ backgroundColor: "black", marginLeft: "10px" }}
        id="country"
        value={userCountry}
        onChange={(e) => setUserCountry(e.target.value)}
      >
        <option value="United States">United States</option>
        <option value="United Arab Emirates">United Arab Emirates</option>
        <option value="India">India</option>
        {/* Add more country options as needed */}
      </select>
      {selectedCurrency && (
        <p>
          Selected Currency ({selectedCurrency}):{" "}
          {convertCurrency(productPrice)}
        </p>
      )}
      {/* Rest of the component code */}
    </div>
  );
}
export default PriceSection;
