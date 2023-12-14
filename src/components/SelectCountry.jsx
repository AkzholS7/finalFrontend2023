import { Autocomplete, Grid, TextField } from "@mui/material";
import useAxios from "../hooks/useAxios";
import { useState, useEffect } from "react";

const SelectCountry = (props) => {
  const { value, setValue, label } = props;
  const [data, loaded, error] = useAxios("https://restcountries.com/v3.1/all");
  const [dataCountries, setDataCountries] = useState([]);

  useEffect(() => {
    if (!loaded && !error && data) {
      const dataFilter = data.filter(item => "currencies" in item);
      const formattedCountries = dataFilter.map(item => {
        return `${item.flag} ${Object.keys(item.currencies)[0]} - ${item.name.common}`;
      });

      // Include "qorot" as an additional option
      const extendedOptions = ["🍏 qorot - Qorot Currency", ...formattedCountries];
      setDataCountries(extendedOptions);
    }
  }, [data, loaded, error]);

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={value}
        disableClearable
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        options={dataCountries}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Grid>
  );
};

export default SelectCountry;
