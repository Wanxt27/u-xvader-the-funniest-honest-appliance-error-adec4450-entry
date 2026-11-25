// The Funniest Honest Appliance Error — make.fun entry.
// A washing machine reports, in its own flat voice, the one fault every
// owner already believes: the missing sock. Node 24, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const error =
  "Error E07: one sock went in. One sock came out. The other one has left us. I am not looking for it.";

// Gate: the sealed scorer only accepts 1-200 UTF-8 characters, a single
// line, and more than whitespace — anything else scores 0 outright. The
// line must also read as a machine error: it opens with an error code,
// and it is long enough to name the fault instead of hinting at it.
const chars = [...error].length;
const bytes = Buffer.byteLength(error, "utf8");
const words = error.trim().split(/\s+/).filter(Boolean);
if (
  chars < 1 ||
  chars > 200 ||
  bytes > 200 ||
  words.length < 10 ||
  !error.startsWith("Error E") ||
  error.includes("\n") ||
  error.trim().length === 0
) {
  throw new Error(
    `error fails the gate (${chars} chars, ${bytes} bytes, ${words.length} words)`
  );
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the error line, nothing extra.
writeFileSync("/output/entry.txt", error, "utf8");

// Read back what was written: the file the judge sees must be the line,
// byte for byte, with nothing extra attached.
if (readFileSync("/output/entry.txt", "utf8") !== error) {
  throw new Error("entry.txt does not match the error line");
}
