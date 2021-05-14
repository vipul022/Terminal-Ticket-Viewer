const axios = require("axios");
const { fetchTickets, findValidTicket } = require("./helpers");

// !mocking the axios
jest.mock("axios");

const result = {
  data: {
    tickets: [
      {
        id: 1,
        subject: "subject1",
        created_at: "20/3/2020",
        status: "open",
      },
      {
        id: 2,
        subject: "subject2",
        created_at: "20/3/2020",
        status: "open",
      },
    ],
  },
};

describe(" Test fetchTickets function", () => {
  it("should fetch tickets successfully", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(result));
    await expect(fetchTickets()).resolves.toEqual(result.data.tickets);
  });
});

// describe("Test showAllTickets function", () => {
//   it("should display the correct number of tickets", () => {
//     showPaginatedTickets = jest.fn();
//     const showAllTickets = () => showPaginatedTickets();
//     const { tickets } = result.data;
//     showAllTickets(tickets);
//     expect(showPaginatedTickets).toHaveBeenCalledTimes(1);

//     const showPaginatedTickets = jest.spyOn(helpers, "showPaginatedTickets");
//     const { tickets } = result.data;
//     showAllTickets(tickets);
//     expect(showPaginatedTickets).toHaveBeenCalledTimes(1);

//     const showPaginatedTickets = jest.fn();
//     const showAllTickets = () => showPaginatedTickets();
//     const { tickets } = result.data;

//     showAllTickets(tickets);
//     expect(showPaginatedTickets).toBeCalled();
//   });
// });

// ! P.S -  I am having issues in testing some functions as they are not returning anything.

describe("Test findValidTicket function", () => {
  const { tickets } = result.data;
  let userInput;
  it("should return a valid ticket", () => {
    userInput = 1;
    expect(findValidTicket(tickets, userInput)).toEqual(tickets[0]);
  });
  it("should return undefined with invalid userInput", () => {
    userInput = 3;
    expect(findValidTicket(tickets, userInput)).toBeUndefined();
  });
});
