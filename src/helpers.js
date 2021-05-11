require("dotenv").config();
const axios = require("axios");
const NETWORK_ERROR = "Sorry! There is some problem in the network";

// !Credentials
const subDomain = process.env.SUB_DOMAIN;
const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;
const url = `https://${subDomain}/api/v2/tickets.json`;
const auth = {
  username: userName,
  password: password,
};
// !function to call Zendesk API
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
    console.log(NETWORK_ERROR);
  }
};

const showAllTickets = (tickets) => {
  tickets.forEach((ticket, index) => {
    let dateCreated = new Date(ticket.created_at).toGMTString();
    console.log(
      `${index + 1}. Ticket subject: ${
        ticket.subject
      },  Date created: ${dateCreated}, Current status: ${ticket.status}`
    );
    console.log("");
  });
};

module.exports = { fetchTickets, showAllTickets };
