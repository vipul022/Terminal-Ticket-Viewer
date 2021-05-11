require("dotenv").config();
const prompt = require("prompt-sync")();
const axios = require("axios");

const showMenu = () => {
  console.log("WeLCOME TO ZENDESK TICKET VIEWER");
  console.log("");
  console.log("Please select from the following options:");
  console.log("1) Press 1 to view all tickets");
  console.log("2) Press 2 to view all tickets");
  console.log("3) Press 3 to exit the application");
  let userInput = prompt("> ");
};

showMenu();
