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
