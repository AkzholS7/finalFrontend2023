import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import axios from 'axios';
import InputAmout from './components/InputAmout';
import SelectCountry from './components/SelectCountry';
import SwitchCurrency from './components/SwitchCurrency';
import { CurrencyContext } from './context/CurrencyContext';
import UniversityLogo from './images/alatoo-logo.png';
import './index.css';
import './App.css';

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

      const qorotToUSD = 0.5; 
      const usdToQorot = 2;
      const nanToUSD = 0.25;
      const usdToNan = 4;
      const shoroToUSD = 0.75;
      const usdToShoro = 1.33;
      const toibosToUSD = 1.25; 
      const usdToToibos = 0.8;
      const shaurmaToUSD = 2;
      const usdToShaurma = 0.5
  
      if (fromCurrency.includes("qorot")) {
        if (toCurrency.includes("qorot")) {
          setResultCurrency(firstAmount);
        } else if (toCurrency !== "USD") {
          const amountInUSD = firstAmount * qorotToUSD; 
          axios("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              base_currency: "USD",
              currencies: codeToCurrency 
            }
          })
          .then(response => {
            const result = response.data.data[codeToCurrency] * amountInUSD;
            setResultCurrency(result);
          })
          .catch(error => console.log(error));
        } else {
          convertedResult = firstAmount * qorotToUSD; 
          setResultCurrency(convertedResult);
        }
      } if (fromCurrency.includes("qorot") && toCurrency.includes("nan")) {
      if (firstAmount && fromCurrency.includes("qorot")) {
        const amountInUSD = firstAmount * qorotToUSD; 
        convertedResult = amountInUSD * usdToNan; 
        setResultCurrency(convertedResult);
      }
    } else if (toCurrency.includes("qorot")) {
        if (fromCurrency !== "USD") {
          axios("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              base_currency: codeFromCurrency,
              currencies: "USD"
            }
          })
          .then(response => {
            const usdValue = response.data.data.USD;
            const amountInUSD = firstAmount * usdValue; 
            convertedResult = amountInUSD * usdToQorot; 
            setResultCurrency(convertedResult);
          })
          .catch(error => console.log(error));
        } else {
          convertedResult = firstAmount * usdToQorot; 
          setResultCurrency(convertedResult);
        }
      }  if (fromCurrency.includes("nan")) {
        if (toCurrency.includes("nan")) {
          setResultCurrency(firstAmount);
        } else if (toCurrency !== "USD") {
          const amountInUSD = firstAmount * nanToUSD; 
          axios("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              base_currency: "USD",
              currencies: codeToCurrency 
            }
          })
          .then(response => {
            const result = response.data.data[codeToCurrency] * amountInUSD;
            setResultCurrency(result);
          })
          .catch(error => console.log(error));
        } else {
          convertedResult = firstAmount * nanToUSD; 
          setResultCurrency(convertedResult);
        }
      } else if (toCurrency.includes("nan")) {
        if (fromCurrency !== "USD") {
          axios("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              base_currency: codeFromCurrency,
              currencies: "USD"
            }
          })
          .then(response => {
            const usdValue = response.data.data.USD;
            const amountInUSD = firstAmount * usdValue; 
            convertedResult = amountInUSD * usdToNan; 
            setResultCurrency(convertedResult);
          })
          .catch(error => console.log(error));
        } else {
          convertedResult = firstAmount * usdToNan; 
          setResultCurrency(convertedResult);
        }
      }     
      
      
      if (fromCurrency.includes("shoro")) {
        if (toCurrency.includes("shoro")) {
          setResultCurrency(firstAmount);
        } else if (toCurrency !== "USD") {
          const amountInUSD = firstAmount * shoroToUSD;
          axios("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              base_currency: "USD",
              currencies: codeToCurrency
            }
          })
          .then(response => {
            const result = response.data.data[codeToCurrency] * amountInUSD;
            setResultCurrency(result);
          })
          .catch(error => console.log(error));
        } else {
          convertedResult = firstAmount * shoroToUSD; 
          setResultCurrency(convertedResult);
        }
      } else if (toCurrency.includes("shoro")) {
        if (fromCurrency !== "USD") {
          axios("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              base_currency: codeFromCurrency,
              currencies: "USD"
            }
          })
          .then(response => {
            const usdValue = response.data.data.USD;
            const amountInUSD = firstAmount * usdValue; 
            convertedResult = amountInUSD * usdToShoro; 
            setResultCurrency(convertedResult);
          })
          .catch(error => console.log(error));
        } else {
          convertedResult = firstAmount * usdToShoro; 
          setResultCurrency(convertedResult);
        }
      }

      
      
      if (fromCurrency.includes("shoro") && toCurrency.includes("nan")) {
        if (firstAmount && fromCurrency.includes("shoro")) {
          const amountInUSD = firstAmount * qorotToUSD; 
          convertedResult = amountInUSD * usdToNan; 
          setResultCurrency(convertedResult);
        }
      } else if (toCurrency.includes("shoro")) {
          if (fromCurrency !== "USD") {
            axios("https://api.freecurrencyapi.com/v1/latest", {
              params: {
                apikey: import.meta.env.VITE_API_KEY,
                base_currency: codeFromCurrency,
                currencies: "USD"
              }
            })
            .then(response => {
              const usdValue = response.data.data.USD;
              const amountInUSD = firstAmount * usdValue; 
              convertedResult = amountInUSD * usdToShoro; 
              setResultCurrency(convertedResult);
            })
            .catch(error => console.log(error));
          } else {
            convertedResult = firstAmount * usdToShoro;
            setResultCurrency(convertedResult);
          }
        }
        
        
        
        
        if (fromCurrency.includes("toibos")) {
          if (toCurrency.includes("toibos")) {
            setResultCurrency(firstAmount);
          } else if (toCurrency !== "USD") {
            const amountInUSD = firstAmount * toibosToUSD;
            axios("https://api.freecurrencyapi.com/v1/latest", {
              params: {
                apikey: import.meta.env.VITE_API_KEY,
                base_currency: "USD",
                currencies: codeToCurrency 
              }
            })
            .then(response => {
              const result = response.data.data[codeToCurrency] * amountInUSD;
              setResultCurrency(result);
            })
            .catch(error => console.log(error));
          } else {
            convertedResult = firstAmount * toibosToUSD; 
            setResultCurrency(convertedResult);
          }
        } else if (toCurrency.includes("toibos")) {
          if (fromCurrency !== "USD") {
            
            axios("https://api.freecurrencyapi.com/v1/latest", {
              params: {
                apikey: import.meta.env.VITE_API_KEY,
                base_currency: codeFromCurrency,
                currencies: "USD"
              }
            })
            .then(response => {
              const usdValue = response.data.data.USD;
              const amountInUSD = firstAmount * usdValue; 
              convertedResult = amountInUSD * usdToToibos; 
              setResultCurrency(convertedResult);
            })
            .catch(error => console.log(error));
          } else {
            convertedResult = firstAmount * usdToToibos; 
            setResultCurrency(convertedResult);
          }
        }       
        
        if (fromCurrency.includes("toibos") && toCurrency.includes("nan")) {
          if (firstAmount && fromCurrency.includes("toibos")) {
            const amountInUSD = firstAmount * qorotToUSD;
            convertedResult = amountInUSD * usdToNan; 
            setResultCurrency(convertedResult);
          }
        } else if (toCurrency.includes("toibos")) {
            if (fromCurrency !== "USD") {
              axios("https://api.freecurrencyapi.com/v1/latest", {
                params: {
                  apikey: import.meta.env.VITE_API_KEY,
                  base_currency: codeFromCurrency,
                  currencies: "USD"
                }
              })
              .then(response => {
                const usdValue = response.data.data.USD;
                const amountInUSD = firstAmount * usdValue; 
                convertedResult = amountInUSD * usdToToibos; 
                setResultCurrency(convertedResult);
              })
              .catch(error => console.log(error));
            } else {
              convertedResult = firstAmount * usdToToibos; 
              setResultCurrency(convertedResult);
            }
          }if (fromCurrency.includes("shaurma")) {
            if (toCurrency.includes("shaurma")) {
              setResultCurrency(firstAmount);
            } else if (toCurrency !== "USD") {
              const amountInUSD = firstAmount * shaurmaToUSD; 
              
              axios("https://api.freecurrencyapi.com/v1/latest", {
                params: {
                  apikey: import.meta.env.VITE_API_KEY,
                  base_currency: "USD",
                  currencies: codeToCurrency 
                }
              })
              .then(response => {
                const result = response.data.data[codeToCurrency] * amountInUSD;
                setResultCurrency(result);
              })
              .catch(error => console.log(error));
            } else {
              convertedResult = firstAmount * shaurmaToUSD; 
              setResultCurrency(convertedResult);
            }
          } else if (toCurrency.includes("shaurma")) {
            if (fromCurrency !== "USD") {
              axios("https://api.freecurrencyapi.com/v1/latest", {
                params: {
                  apikey: import.meta.env.VITE_API_KEY,
                  base_currency: codeFromCurrency,
                  currencies: "USD"
                }
              })
              .then(response => {
                const usdValue = response.data.data.USD;
                const amountInUSD = firstAmount * usdValue; 
                convertedResult = amountInUSD * usdToShaurma; 
                setResultCurrency(convertedResult);
              })
              .catch(error => console.log(error));
            } else {
              convertedResult = firstAmount * usdToShaurma; 
              setResultCurrency(convertedResult);
            }
          }
        
          
          
          if (fromCurrency.includes("shaurma") && toCurrency.includes("nan")) {
            if (firstAmount && fromCurrency.includes("shaurma")) {
              const amountInUSD = firstAmount * qorotToUSD; 
              convertedResult = amountInUSD * usdToNan; 
              setResultCurrency(convertedResult);
            }
          } else if (toCurrency.includes("shaurma")) {
              if (fromCurrency !== "USD") {
                axios("https://api.freecurrencyapi.com/v1/latest", {
                  params: {
                    apikey: import.meta.env.VITE_API_KEY,
                    base_currency: codeFromCurrency,
                    currencies: "USD"
                  }
                })
                .then(response => {
                  const usdValue = response.data.data.USD;
                  const amountInUSD = firstAmount * usdValue; 
                  convertedResult = amountInUSD * usdToShaurma; 
                  setResultCurrency(convertedResult);
                })
                .catch(error => console.log(error));
              } else {
                convertedResult = firstAmount * usdToShaurma; 
                setResultCurrency(convertedResult);
              }
            }else {
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
    position: "relative",
    width: "250%"

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

          <InputAmout />
  
         
          <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
  
          
          <SwitchCurrency />
  
         
          <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
        </Grid>

        {firstAmount ? (
  <Box style={{ textAlign: "left", marginTop: "1rem"}}>
    <Typography>{firstAmount} {fromCurrency} =</Typography>
    <Typography variant='h5' style={{ marginTop: "5px", fontWeight: "bold"}}>
      {resultCurrency} {toCurrency}
    </Typography>
  </Box>
) : ""}
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
