import Apollo from "@apollo/client";

test("Server is running", async () => {
  expect(Apollo).not.toBe({});
});
