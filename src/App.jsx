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
  } = useContext(CurrencyContext);

  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

  useEffect(() => {
    if (firstAmount) {
      let convertedResult = 0;
  
      // Exchange rates
      const qorotToUSD = 0.5; // 1 qorot = 0.5 USD
      const usdToQorot = 2; // 1 USD = 2 qorot
      const nanToUSD = 0.25;
      const usdToNan = 4;
      const shoroToUSD = 0.75;
      const usdToShoro = 1.33;
      const toibosToUSD = 1.25; 
      const usdToToibos = 0.8;
  
      if (fromCurrency.includes("qorot")) {
        if (toCurrency.includes("qorot")) {
          setResultCurrency(firstAmount);
        } else if (toCurrency !== "USD") {
          const amountInUSD = firstAmount * qorotToUSD; // Convert to USD
          // Fetch conversion rates from the API using USD
          axios("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              base_currency: "USD",
              currencies: codeToCurrency // Use the desired currency code here
            }
          })
          .then(response => {
            const result = response.data.data[codeToCurrency] * amountInUSD;
            setResultCurrency(result);
          })
          .catch(error => console.log(error));
        } else {
          convertedResult = firstAmount * qorotToUSD; // Use directly if toCurrency is USD
          setResultCurrency(convertedResult);
        }
      } if (fromCurrency.includes("qorot") && toCurrency.includes("nan")) {
      if (firstAmount && fromCurrency.includes("qorot")) {
        const amountInUSD = firstAmount * qorotToUSD; // Convert to USD
        convertedResult = amountInUSD * usdToNan; // Convert USD to nan
        setResultCurrency(convertedResult);
      }
    } else if (toCurrency.includes("qorot")) {
        if (fromCurrency !== "USD") {
          // Fetch conversion rates to USD from the API
          axios("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              base_currency: codeFromCurrency,
              currencies: "USD"
            }
          })
          .then(response => {
            const usdValue = response.data.data.USD;
            const amountInUSD = firstAmount * usdValue; // Convert to USD
            convertedResult = amountInUSD * usdToQorot; // Multiply by usdToQorot
            setResultCurrency(convertedResult);
          })
          .catch(error => console.log(error));
        } else {
          convertedResult = firstAmount * usdToQorot; // Use directly if fromCurrency is USD
          setResultCurrency(convertedResult);
        }
      }  if (fromCurrency.includes("nan")) {
        if (toCurrency.includes("nan")) {
          setResultCurrency(firstAmount);
        } else if (toCurrency !== "USD") {
          const amountInUSD = firstAmount * nanToUSD; // Convert to USD
          // Fetch conversion rates from the API using USD
          axios("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              base_currency: "USD",
              currencies: codeToCurrency // Use the desired currency code here
            }
          })
          .then(response => {
            const result = response.data.data[codeToCurrency] * amountInUSD;
            setResultCurrency(result);
          })
          .catch(error => console.log(error));
        } else {
          convertedResult = firstAmount * nanToUSD; // Use directly if toCurrency is USD
          setResultCurrency(convertedResult);
        }
      } else if (toCurrency.includes("nan")) {
        if (fromCurrency !== "USD") {
          // Fetch conversion rates to USD from the API
          axios("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              base_currency: codeFromCurrency,
              currencies: "USD"
            }
          })
          .then(response => {
            const usdValue = response.data.data.USD;
            const amountInUSD = firstAmount * usdValue; // Convert to USD
            convertedResult = amountInUSD * usdToNan; // Multiply by usdToNan
            setResultCurrency(convertedResult);
          })
          .catch(error => console.log(error));
        } else {
          convertedResult = firstAmount * usdToNan; // Use directly if fromCurrency is USD
          setResultCurrency(convertedResult);
        }
      } 
      
      
// #########################################///////////////////////////////////////////////////////////      
      
      
      if (fromCurrency.includes("shoro")) {
        if (toCurrency.includes("shoro")) {
          setResultCurrency(firstAmount);
        } else if (toCurrency !== "USD") {
          const amountInUSD = firstAmount * shoroToUSD; // Convert to USD
          // Fetch conversion rates from the API using USD
          axios("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              base_currency: "USD",
              currencies: codeToCurrency // Use the desired currency code here
            }
          })
          .then(response => {
            const result = response.data.data[codeToCurrency] * amountInUSD;
            setResultCurrency(result);
          })
          .catch(error => console.log(error));
        } else {
          convertedResult = firstAmount * shoroToUSD; // Use directly if toCurrency is USD
          setResultCurrency(convertedResult);
        }
      } else if (toCurrency.includes("shoro")) {
        if (fromCurrency !== "USD") {
          // Fetch conversion rates to USD from the API
          axios("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              base_currency: codeFromCurrency,
              currencies: "USD"
            }
          })
          .then(response => {
            const usdValue = response.data.data.USD;
            const amountInUSD = firstAmount * usdValue; // Convert to USD
            convertedResult = amountInUSD * usdToShoro; // Multiply by usdToShoro
            setResultCurrency(convertedResult);
          })
          .catch(error => console.log(error));
        } else {
          convertedResult = firstAmount * usdToShoro; // Use directly if fromCurrency is USD
          setResultCurrency(convertedResult);
        }
      }

      
      
      if (fromCurrency.includes("shoro") && toCurrency.includes("nan")) {
        if (firstAmount && fromCurrency.includes("shoro")) {
          const amountInUSD = firstAmount * qorotToUSD; // Convert to USD
          convertedResult = amountInUSD * usdToNan; // Convert USD to nan
          setResultCurrency(convertedResult);
        }
      } else if (toCurrency.includes("shoro")) {
          if (fromCurrency !== "USD") {
            // Fetch conversion rates to USD from the API
            axios("https://api.freecurrencyapi.com/v1/latest", {
              params: {
                apikey: import.meta.env.VITE_API_KEY,
                base_currency: codeFromCurrency,
                currencies: "USD"
              }
            })
            .then(response => {
              const usdValue = response.data.data.USD;
              const amountInUSD = firstAmount * usdValue; // Convert to USD
              convertedResult = amountInUSD * usdToShoro; // Multiply by usdToQorot
              setResultCurrency(convertedResult);
            })
            .catch(error => console.log(error));
          } else {
            convertedResult = firstAmount * usdToShoro; // Use directly if fromCurrency is USD
            setResultCurrency(convertedResult);
          }
        }
        
        
        
        
        if (fromCurrency.includes("toibos")) {
          if (toCurrency.includes("toibos")) {
            setResultCurrency(firstAmount);
          } else if (toCurrency !== "USD") {
            const amountInUSD = firstAmount * toibosToUSD; // Convert to USD
            // Fetch conversion rates from the API using USD
            axios("https://api.freecurrencyapi.com/v1/latest", {
              params: {
                apikey: import.meta.env.VITE_API_KEY,
                base_currency: "USD",
                currencies: codeToCurrency // Use the desired currency code here
              }
            })
            .then(response => {
              const result = response.data.data[codeToCurrency] * amountInUSD;
              setResultCurrency(result);
            })
            .catch(error => console.log(error));
          } else {
            convertedResult = firstAmount * toibosToUSD; // Use directly if toCurrency is USD
            setResultCurrency(convertedResult);
          }
        } else if (toCurrency.includes("toibos")) {
          if (fromCurrency !== "USD") {
            // Fetch conversion rates to USD from the API
            axios("https://api.freecurrencyapi.com/v1/latest", {
              params: {
                apikey: import.meta.env.VITE_API_KEY,
                base_currency: codeFromCurrency,
                currencies: "USD"
              }
            })
            .then(response => {
              const usdValue = response.data.data.USD;
              const amountInUSD = firstAmount * usdValue; // Convert to USD
              convertedResult = amountInUSD * usdToToibos; // Multiply by usdToToibos
              setResultCurrency(convertedResult);
            })
            .catch(error => console.log(error));
          } else {
            convertedResult = firstAmount * usdToToibos; // Use directly if fromCurrency is USD
            setResultCurrency(convertedResult);
          }
        }
      
        
        
        if (fromCurrency.includes("toibos") && toCurrency.includes("nan")) {
          if (firstAmount && fromCurrency.includes("toibos")) {
            const amountInUSD = firstAmount * qorotToUSD; // Convert to USD
            convertedResult = amountInUSD * usdToNan; // Convert USD to nan
            setResultCurrency(convertedResult);
          }
        } else if (toCurrency.includes("toibos")) {
            if (fromCurrency !== "USD") {
              // Fetch conversion rates to USD from the API
              axios("https://api.freecurrencyapi.com/v1/latest", {
                params: {
                  apikey: import.meta.env.VITE_API_KEY,
                  base_currency: codeFromCurrency,
                  currencies: "USD"
                }
              })
              .then(response => {
                const usdValue = response.data.data.USD;
                const amountInUSD = firstAmount * usdValue; // Convert to USD
                convertedResult = amountInUSD * usdToToibos; // Multiply by usdToQorot
                setResultCurrency(convertedResult);
              })
              .catch(error => console.log(error));
            } else {
              convertedResult = firstAmount * usdToToibos; // Use directly if fromCurrency is USD
              setResultCurrency(convertedResult);
            }
          }else {
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
