import { Block } from "../block/block.js";

export function hasValidLink(previous: Block, current: Block): boolean {
  return current.previousHash === previous.hash;
}

export function hasValidHash(current: Block): boolean {
  return current.hash ===
    Block.computeHash({
      index: current.index,
      previousHash: current.previousHash,
      timestamp: current.timestamp,
      nonce: current.nonce,
      transactions: current.transactions,
    });
}

export function hasValidIndex(previous: Block, current: Block): boolean {
  return current.index === previous.index + 1;
}
