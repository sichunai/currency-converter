const express = require("express");
const axios = require("axios");
const url = require("url");

// function to get the data from the API
let getConversion = async (input, output) => {
  let response = await axios(
    `https://v6.exchangerate-api.com/v6/ee28c875c5b6be2f4dbc3d5d/pair/${input}/${output}`
  );
  return response;
};
//controller function
module.exports = async (req, res) => {
  const { url: reqURL } = req;
  let urlObject = url.parse(reqURL, true).query;
  const { input, output } = urlObject;
  let responseConversion = await getConversion(input, output);
  res.send(responseConversion.data);
};
