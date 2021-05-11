const prompt = require("prompt-sync")();
const fetchTickets = require("./helpers");

let userInput;

let getTickets = fetchTickets();

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
getTickets.then((tickets) => {
  console.log("inside getTickets=>");
  switch (userInput) {
    case 1:
      console.log(`${userInput} is 1`);
      console.log("tickets=>", tickets[0].subject);
      break;
    case 2:
      console.log(`${userInput} is 2`);
      break;
    case 3:
      console.log(`${userInput} is 3`);
  }
});
