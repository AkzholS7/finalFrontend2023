import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import axios from 'axios';
import InputAmout from './components/InputAmout';
import SelectCountry from './components/SelectCountry';
import SwitchCurrency from './components/SwitchCurrency';
import { CurrencyContext } from './context/CurrencyContext';
import UniversityLogo from './images/alatoo-logo.png';
import './index.css';

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    qorotValue,
    shoroValue
  } = useContext(CurrencyContext);

  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

  useEffect(() => {
    if (firstAmount) {
      let convertedResult = 0;
  
      if (fromCurrency.includes("qorot") && toCurrency.includes("qorot")) {
        // If both 'from' and 'to' are qorot, the result should be equal to the input amount
        convertedResult = firstAmount;
        setResultCurrency(convertedResult);
      } else if (fromCurrency.includes("qorot") && !toCurrency.includes("qorot")) {
        // Fetch exchange rate between qorot and the 'to' currency
        axios("https://api.freecurrencyapi.com/v1/latest", {
          params: {
            apikey: import.meta.env.VITE_API_KEY,
            from: "qorot",
            to: codeToCurrency // Use 'codeToCurrency' for the API request instead of 'toCurrency'
          }
        })
          .then(response => {
            const exchangeRate = response.data.data[codeToCurrency]; // Extract the exchange rate from the response
      
            // Perform conversion using the fetched exchange rate
            convertedResult = firstAmount * exchangeRate;
            setResultCurrency(convertedResult);
          })
          .catch(error => console.log(error));
      } else if (!fromCurrency.includes("qorot") && toCurrency.includes("qorot")) {
        // Fetch exchange rate between qorot and the 'from' currency
        axios("https://api.freecurrencyapi.com/v1/latest", {
          params: {
            apikey: import.meta.env.VITE_API_KEY,
            from: codeFromCurrency, // Use 'codeFromCurrency' for the API request instead of 'fromCurrency'
            to: "qorot"
          }
        })
          .then(response => {
            const exchangeRate = response.data.data[codeFromCurrency]; // Extract the exchange rate from the response
            
            // Check if the exchange rate exists in the response data
            if (exchangeRate !== undefined) {
              // Perform conversion to qorot using the fetched exchange rate
              convertedResult = firstAmount / exchangeRate;
              setResultCurrency(convertedResult);
            } else {
              console.log("Exchange rate not found for the specified currency:", codeFromCurrency);
              // Handle the case where the exchange rate is not available for the specified currency
            }
          })
          .catch(error => console.log(error));
      }
       else {
        // Fetch conversion rates from the API
        axios("https://api.freecurrencyapi.com/v1/latest", {
          params: {
            apikey: import.meta.env.VITE_API_KEY,
            base_currency: codeFromCurrency,
            currencies: codeToCurrency
          }
        })
          .then(response => {
            const result = response.data.data[codeToCurrency] * firstAmount;
            setResultCurrency(result);
          })
          .catch(error => console.log(error));
      }
    }
  }, [firstAmount, fromCurrency, toCurrency, codeFromCurrency, codeToCurrency, qorotValue, shoroValue]);
  
  
  
  
  

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "2rem",
    textAlign: "center",
    color: "#222",
    padding: "2rem",
    borderRadius: 14,
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }

  return (
    <Box style={boxStyles}>
      <Container maxWidth="md">
        <img
          src={UniversityLogo}
          alt="University Logo"
          className="logo-animation"
          style={{ width: '90px', marginBottom: '3rem' }}
        />
        <Typography variant='h5' style={{ marginBottom: "2rem" }}>Enter your amount to convert to any currency</Typography>
        <Grid container spacing={2}>
          {/* Input for the amount */}
          <InputAmout />
  
          {/* Dropdown for selecting 'From' currency */}
          <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
  
          {/* Switch button to change currency direction */}
          <SwitchCurrency />
  
          {/* Dropdown for selecting 'To' currency */}
          <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
        </Grid>
  
        {/* Display conversion result */}
        {firstAmount ? (
          <Box style={{ textAlign: "left", marginTop: "1rem"}}>
            <Typography>{firstAmount} {fromCurrency} =</Typography>
            <Typography variant='h5' style={{ marginTop: "5px", fontWeight: "bold"}}>
              {resultCurrency * firstAmount} {toCurrency}
            </Typography>
          </Box>
        ) : ""}
        
        {/* Link to GitHub repo */}
        <Typography fontSize="10px" style={{ position: "absolute", bottom: "1rem", right: "1rem" }}>
          <Link target="_blank" rel="noopener" href="https://github.com/AkzholS7/finalFrontend2023">
            You can see my code on my GitHub repo
          </Link>
        </Typography>
      </Container>
    </Box>
  );
  
}

export default App;
