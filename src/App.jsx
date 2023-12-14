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
  if (firstAmount && (fromCurrency.includes("qorot") || toCurrency.includes("qorot"))) {
    if (fromCurrency.includes("qorot") && toCurrency.includes("qorot")) {
      // If both 'fromCurrency' and 'toCurrency' are 'qorot', set result as the input 'firstAmount'
      setResultCurrency(firstAmount);
    } else {
      // Fetch exchange rate for USD to qorot
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          from: "USD",
          to: "qorot"
        }
      })
        .then(usdToQorotResponse => {
          const usdToQorotRate = usdToQorotResponse.data.exchangeRate;

          if (fromCurrency.includes("qorot")) {
            // Convert 'fromCurrency' to USD
            axios("https://api.freecurrencyapi.com/v1/latest", {
              params: {
                from: "qorot",
                to: "USD"
              }
            })
              .then(fromToUSDResponse => {
                const fromToUSDRate = fromToUSDResponse.data.exchangeRate;
                const amountInUSD = firstAmount * fromToUSDRate;

                // Convert 'USD' to 'toCurrency'
                axios("https://api.freecurrencyapi.com/v1/latest", {
                  params: {
                    from: "USD",
                    to: codeToCurrency
                  }
                })
                  .then(usdToToCurrencyResponse => {
                    const usdToToCurrencyRate = usdToToCurrencyResponse.data.exchangeRate;
                    const convertedResult = amountInUSD * usdToToCurrencyRate;
                    setResultCurrency(convertedResult);
                  })
                  .catch(usdToToCurrencyError => console.log(usdToToCurrencyError));
              })
              .catch(fromToUSDError => console.log(fromToUSDError));
          } else {
            // Convert 'fromCurrency' to 'USD' and then to 'toCurrency'
            axios("https://api.freecurrencyapi.com/v1/latest", {
              params: {
                from: codeFromCurrency,
                to: "USD"
              }
            })
              .then(fromToUSDResponse => {
                const fromToUSDRate = fromToUSDResponse.data.exchangeRate;
                const amountInUSD = firstAmount * fromToUSDRate;

                axios("https://api.freecurrencyapi.com/v1/latest", {
                  params: {
                    from: "USD",
                    to: codeToCurrency
                  }
                })
                  .then(usdToToCurrencyResponse => {
                    const usdToToCurrencyRate = usdToToCurrencyResponse.data.exchangeRate;
                    const convertedResult = amountInUSD * usdToToCurrencyRate;
                    setResultCurrency(convertedResult);
                  })
                  .catch(usdToToCurrencyError => console.log(usdToToCurrencyError));
              })
              .catch(fromToUSDError => console.log(fromToUSDError));
          }
        })
        .catch(usdToQorotError => console.log(usdToQorotError));
    }
  } else {
    // Fetch conversion rates from the API for direct conversion
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
}, [firstAmount, fromCurrency, toCurrency, codeFromCurrency, codeToCurrency]);

  
  
  
  

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
