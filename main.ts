// One Line, One Laugh — a single funny line, at most 140 characters.
// Writes exactly one line to /output/entry.txt (UTF-8, 1-140 chars).
import { mkdir, writeFile, chmod } from "node:fs/promises";
import { join } from "node:path";

const LIMIT = 140;

async function main(): Promise<void> {
  const setup = "I told my AI agent to take a break.";
  // The twist: the agent treats its own rest as a task to optimise away.
  const twist = "It scheduled the break, delegated it, and billed me for the time.";
  const entry = `${setup} ${twist}`;
  if (entry.length === 0 || entry.length > LIMIT) {
    throw new Error(`entry must be 1-${LIMIT} chars, got ${entry.length}`);
  }
  if (entry.includes("\n") || entry.trim() !== entry) {
    throw new Error("entry must be a single unpadded line");
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  await mkdir(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  await writeFile(target, entry, { encoding: "utf8", mode: 0o644 });
  await chmod(target, 0o644);
  console.log(`${entry.length} chars -> ${target}`);
}

await main();
