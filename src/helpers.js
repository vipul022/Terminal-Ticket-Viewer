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
let result = {
  page: 1,
  nextPage: 0,
  prevPage: 0,
  limit: 25,
  paginatedTickets: [],
};
let startIndex = 0;
let endIndex = 0;
// !function to call Zendesk API
const fetchTickets = async () => {
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

const showPaginatedTickets = (tickets) => {
  startIndex = (result.page - 1) * result.limit;
  endIndex = result.page * result.limit;
  incrementOrDecrementPage(tickets);
  result.paginatedTickets = tickets.slice(startIndex, endIndex);

  console.log("paginatedTickets=>", result.paginatedTickets.length);
  // return result;
};

const incrementOrDecrementPage = (tickets) => {
  console.log("endIndex=>", endIndex);
  console.log("startIndex=>", startIndex);
  console.log("tickets.length=>", tickets.length);
  if (endIndex < tickets.length) {
    result = { ...result, nextPage: result.page + 1 };
    console.log("inside if statement=>", result.page);
  }

  if (startIndex > 0) {
    // result.page - 1;
    result = { ...result, prevPage: result.page - 1 };
  }
};

const showAllTickets = (tickets) => {
  // const result = showPaginatedTickets(tickets);
  do {
    showPaginatedTickets(tickets);
    let { paginatedTickets } = result;
    console.log("paginatedTickets=>", paginatedTickets.length);
    console.log("inside showAllTickets=>");
    paginatedTickets.forEach((ticket, index) => {
      let dateCreated = new Date(ticket.created_at).toGMTString();
      console.log(
        `${index + 1}. Ticket subject: ${
          ticket.subject
        },  Date created: ${dateCreated}, Current status: ${ticket.status}`
      );
      console.log("");
    });
    console.log(`Page: ${result.page}`);
    console.log(`Next: ${result.nextPage}`);
    if (result.prevPage > 0) {
      console.log(`Prev: ${result.prevPage}`);
    }

    console.log()
  } while(result.page <= tickets / result.limit)
  // incrementOrDecrementPage(tickets);
  // console.log(`Page: ${result.page}`);
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
