import crypto from 'crypto-js';

const computeHash = (jsonData: any): string => {
  const stringData = JSON.stringify(jsonData);
  return crypto.SHA256(stringData).toString();
};

export const compareGraphHashes = (oldGraph: any, newGraph: any): boolean => {
  const oldGraphHash = computeHash(oldGraph);
  const newGraphHash = computeHash(newGraph);
  return oldGraphHash === newGraphHash;
};
