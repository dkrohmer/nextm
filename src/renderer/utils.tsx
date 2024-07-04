import { Graph } from '@antv/x6';
import crypto from 'crypto-js';

const computeHash = (jsonData: any): string => {
  const stringData = JSON.stringify(jsonData);
  return crypto.SHA256(stringData).toString();
};

export const compareHashes = (oldGraph: any, newGraph: any): boolean => {
  // Compute the current hash
  const oldGraphHash = computeHash(oldGraph);
  const newGraphHash = computeHash(newGraph)

  // Compare the current hash with the latest hash
  return oldGraphHash === newGraphHash;
};
