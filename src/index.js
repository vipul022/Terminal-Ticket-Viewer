const prompt = require("prompt-sync")();
const { fetchTickets, showAllTickets, showSingleTicket } = require("./helpers");
const INVALID_INPUT = "=> Please enter valid input! <=";
let userInput;
let displayMenu = false;
const getTickets = fetchTickets();
const showMenu = () => {
  console.log("***************************************");
  console.log("WeLCOME TO ZENDESK TICKET VIEWER");
  console.log("***************************************");
  console.log("");
  console.log("Please select from the following options:");
  console.log("1) Press 1 to view all tickets");
  console.log("2) Press 2 to view an individual ticket");
  console.log("3) Press 3 to exit the application");
  userInput = Number(prompt("> "));
};

showMenu();

getTickets
  .then((tickets) => {
    console.log("inside getTickets=>");

    console.log("userInput=>", userInput);
    switch (userInput) {
      case 1:
        showAllTickets(tickets);
        break;
      case 2:
        console.log(`${userInput} is 2`);
        showSingleTicket(tickets);
        break;
      case 3:
        console.log(`${userInput} is 3`);
        console.log(`Thanks for using Zendesk Ticket Viewer! See you soon`);
        displayMenu = false;
        break;
      default:
        console.log(INVALID_INPUT);
      // userInput = showMenu();
    }
    // showMenu();
  })
  .catch((error) => {
    console.log("ERROR=>,", error);
  });
