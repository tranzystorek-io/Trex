import { red, green } from "https://deno.land/std/fmt/colors.ts";

export async function LockFile(...args: string[]) {
  const [_, importmap, file] = args;

  let conf: string[] = [file];

  if (file && importmap) {
    conf = ["--importmap=import_map.json", "--unstable", file];
  } else if (!file) {
    conf = [importmap];
  }

  const process = Deno.run({
    cmd: ["deno", "cache", "--lock=lock.json", "--lock-write", ...conf],
  });

  if (!(await process.status()).success) {
    throw Error(red("Error: creating lock.json file")).message;
  }

  console.log("|- ", green("lock.json\ndone it."));
}
