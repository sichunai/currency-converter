const express = require("express");
const axios = require("axios");
// function to get the data from the API
let getCurrency = async () => {
  let response = await axios(
    `https://v6.exchangerate-api.com/v6/ee28c875c5b6be2f4dbc3d5d/latest/USD`
  );
  return response;
};
//controller function
module.exports = async (req, res) => {
  let responseCurrency = await getCurrency();
  res.send(responseCurrency.data);
};
