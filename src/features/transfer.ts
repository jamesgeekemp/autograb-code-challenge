import { Transfer } from "../model/transaction.ts";
import { deposit, withdrawal } from "./deposit.ts";

export const transfer = async (
  fromUserId: string,
  fromAccountId: string,
  toUserId: string,
  toAccountId: string,
  transferAmount: number
): Promise<Transfer> => {
  const withdrawalResult = await withdrawal(
    fromUserId,
    fromAccountId,
    transferAmount
  );
  console.log(withdrawalResult);
  const depositResult = await deposit(toUserId, toAccountId, transferAmount);
  return {
    withdrawal: withdrawalResult,
    deposit: depositResult,
  };
};
