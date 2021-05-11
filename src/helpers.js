require("dotenv").config();
const prompt = require("prompt-sync")();
const axios = require("axios");
const NETWORK_ERROR = "=> Sorry! There is some problem in the network <=";
const INVALID_ID = "=> Please enter a valid Ticket Id <=";

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
    console.log("here1");
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
  console.log("inside showAlltiskets=>");
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

const findValidTicket = (tickets, userInput) => {
  let validTicket = tickets.find((ticket) => ticket.id === userInput);
  return validTicket;
};

const showSingleTicket = (tickets) => {
  let userInput;
  console.log("Please enter the id of the ticket ");
  userInput = Number(prompt("> "));

  let ticket = findValidTicket(tickets, userInput);

  if (ticket) {
    let dateCreated = new Date(ticket.created_at).toGMTString();
    console.log(`* Ticket id: ${ticket.id}`);
    console.log(`* Ticket subject: ${ticket.subject}`);
    console.log(`* Date created: ${dateCreated}`);
    console.log(`* Description: ${ticket.description}`);
    console.log(`* Priority: ${ticket.priority}`);
    console.log(`* Current status: ${ticket.status}`);
  } else {
    console.log(INVALID_ID);
  }
};

module.exports = { fetchTickets, showAllTickets, showSingleTicket };
