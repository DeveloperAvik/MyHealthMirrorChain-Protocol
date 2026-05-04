import { Block } from "../block/block.js";
import { hasValidHash, hasValidIndex, hasValidLink } from "../validation/validators.js";
import type { Transaction } from "../types/transaction.js";

export class Blockchain {
  private readonly chain: Block[];

  public constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  public getBlocks(): readonly Block[] {
    return this.chain;
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public addBlock(transactions: Transaction[]): Block {
    const latest = this.getLatestBlock();
    const next = new Block({
      index: latest.index + 1,
      previousHash: latest.hash,
      timestamp: Date.now(),
      nonce: 0,
      transactions,
    });

    if (!this.isValidNextBlock(latest, next)) {
      throw new Error("Invalid block");
    }

    this.chain.push(next);
    return next;
  }

  public isValidChain(): boolean {
    for (let i = 1; i < this.chain.length; i += 1) {
      const previous = this.chain[i - 1];
      const current = this.chain[i];

      if (!this.isValidNextBlock(previous, current)) {
        return false;
      }
    }

    return true;
  }

  private createGenesisBlock(): Block {
    return new Block({
      index: 0,
      previousHash: "0",
      timestamp: 1710000000000,
      nonce: 0,
      transactions: [],
    });
  }

  private isValidNextBlock(previous: Block, current: Block): boolean {
    return (
      hasValidIndex(previous, current) &&
      hasValidLink(previous, current) &&
      hasValidHash(current)
    );
  }
}
