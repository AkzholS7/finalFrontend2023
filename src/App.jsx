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
  
      if (toCurrency.includes("qorot")) {
        // Calculate for qorot currency using qorotValue
        convertedResult = firstAmount * qorotValue;
        setResultCurrency(convertedResult);
      } else if (toCurrency.includes("shoro")) {
        // Calculate for shoro currency using shoroValue
        convertedResult = firstAmount * shoroValue;
        setResultCurrency(convertedResult);
      } else {
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
      {resultCurrency} {toCurrency}
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
