import { createHash } from "node:crypto";
import type { Transaction } from "../types/transaction.js";

export interface BlockData {
  index: number;
  previousHash: string;
  timestamp: number;
  nonce: number;
  transactions: Transaction[];
}

export class Block {
  public readonly index: number;
  public readonly previousHash: string;
  public readonly timestamp: number;
  public readonly nonce: number;
  public readonly transactions: Transaction[];
  public readonly hash: string;

  public constructor(data: BlockData) {
    this.index = data.index;
    this.previousHash = data.previousHash;
    this.timestamp = data.timestamp;
    this.nonce = data.nonce;
    this.transactions = data.transactions;
    this.hash = Block.computeHash(data);
  }

  public static computeHash(data: BlockData): string {
    const content = JSON.stringify({
      index: data.index,
      previousHash: data.previousHash,
      timestamp: data.timestamp,
      nonce: data.nonce,
      transactions: data.transactions,
    });

    return createHash("sha256").update(content).digest("hex");
  }
}
