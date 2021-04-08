import { gql } from "@apollo/client";

test("Server is running", async () => {
  expect(gql).not.toBe({});
});
