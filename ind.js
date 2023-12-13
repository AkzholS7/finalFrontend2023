import express from 'express';
const app = express();

// Mock exchange rate data
const exchangeRates = {
  base: 'USD',
  rates: {
    EUR: 0.88,
    GBP: 0.78,
    // Add other currencies and rates as needed
  }
};

app.get('/exchange-rates', (req, res) => {
  res.json(exchangeRates);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
