require("dotenv").config();
const axios = require("axios");

// !Credentials
const subDomain = process.env.SUB_DOMAIN;
const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;
const url = `https://${subDomain}/api/v2/tickets.json`;
const auth = {
  username: userName,
  password: password,
};
const fetchTickets = async () => {
  console.log("inside fetchTickets=>");
  try {
    let result = await axios.get(url, {
      auth: auth,
      Accept: "application / json",
    });
    let data = result.data.tickets;
    return data;
  } catch (error) {
    console.log("ERROR=>", error);
  }
};

module.exports = fetchTickets;
