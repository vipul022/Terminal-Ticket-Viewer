const prompt = require("prompt-sync")();
const { fetchTickets, showAllTickets } = require("./helpers");

let userInput;

const showMenu = () => {
  console.log("WeLCOME TO ZENDESK TICKET VIEWER");
  console.log("");
  console.log("Please select from the following options:");
  console.log("1) Press 1 to view all tickets");
  console.log("2) Press 2 to view all tickets");
  console.log("3) Press 3 to exit the application");
  userInput = Number(prompt("> "));
};
showMenu();
let getTickets = fetchTickets();
getTickets
  .then((tickets) => {
    console.log("inside getTickets=>");
    switch (userInput) {
      case 1:
        showAllTickets(tickets);
        break;
      case 2:
        console.log(`${userInput} is 2`);
        break;
      case 3:
        console.log(`${userInput} is 3`);
    }
  })
  .catch((error) => {
    console.log("ERROR=>,", error);
  });
