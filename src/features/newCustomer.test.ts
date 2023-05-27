const postUserMock = jest.fn();
const postAccountMock = jest.fn();

jest.mock("../store/store", () => ({
  __esModule: true,
  default: {
    postUser: postUserMock,
    postAccount: postAccountMock,
  },
}));

import { AccountInput } from "../model/account.ts";
import { User, UserInput } from "../model/user.ts";
import { newCustomer } from "./newCustomer.ts";
const testUserName = "testuser";
const testUserId = "12345";
const testAccountId = "98765";
describe("new customer", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("given customer signs up with balance 100", () => {
    it("creates User and Account", async () => {
      postUserMock.mockImplementation((userInput: UserInput) =>
        Promise.resolve({
          ...userInput,
          id: testUserId,
        })
      );
      postAccountMock.mockImplementation((accountInput: AccountInput) =>
        Promise.resolve({
          ...accountInput,
          id: testAccountId,
        })
      );
      const result = await newCustomer(testUserName, 100);
      expect(result).toEqual({
        id: testUserId,
        role: "customer",
        username: testUserName,
      } as User);
      expect(postUserMock).toHaveBeenCalledTimes(1);
      expect(postUserMock).toHaveBeenCalledWith({
        username: "testuser",
        role: "customer",
      } as UserInput);
      expect(postAccountMock).toHaveBeenCalledTimes(1);
      expect(postAccountMock).toHaveBeenCalledWith({
        type: "savings",
        balance: 100,
      } as AccountInput);
    });
  });
  describe("given customer signs up with invalid username", () => {
    it("rejects with Zod error", () => {
      return expect(
        newCustomer(undefined as unknown as string, 100)
      ).rejects.toThrow(
        expect.objectContaining({
          name: "ZodError",
        })
      );
    });
  });
});
