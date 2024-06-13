import genDiff from "../src/difference.js";
import { expect, test } from "@jest/globals";
import parseFile from "../src/parser.js";
import path from "path";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test("No change should be noticed", () => {
  const data = {
    fileOneData: { a: 1, b: 2, c: 3 },
    fileTwoData: { a: 1, b: 2, c: 3 },
  };

  const answer = `{\r\n${["    a: 1", "    b: 2", "    c: 3"].join("\r\n")}\r\n}`;

  expect(genDiff(data)).toBe(answer);
});

test("Changing data in b", () => {
  const data = {
    fileOneData: { a: 1, b: 2, c: 3 },
    fileTwoData: { a: 1, b: 4, c: 3 },
  };

  const answer = `{\r\n${["    a: 1", "  - b: 2", "  + b: 4", "    c: 3"].join("\r\n")}\r\n}`;

  expect(genDiff(data)).toBe(answer);
});

test("Comparison of Hexlet response and program response", () => {
  const data = parseFile(
    path.join(__dirname, "..", "__fixtures__", "file1.json"),
    path.join(__dirname, "..", "__fixtures__", "file2.json"),
  );

  const answer = readFileSync(
    path.join(__dirname, "..", "__fixtures__", "answer.txt"),
    { encoding: "utf-8" },
  );

  expect(genDiff(data)).toBe(answer);
});

test("Check alphabetical sorting", () => {
  const data = {
    fileOneData: { b: 1, d: 2, c: 3 },
    fileTwoData: { a: 1, b: 4, c: 3, e: 5 },
  };

  const answer = `{\r\n${["  + a: 1", "  - b: 1", "  + b: 4", "    c: 3", "  - d: 2", "  + e: 5"].join("\r\n")}\r\n}`;

  expect(genDiff(data)).toBe(answer);
});
