
const PROJECT_PATH = "./"
async function main() {
  const installationPath = Deno.env.get("DENO_INSTALL");

  console.log("intallation", installationPath)
  console.log(import.meta.url)

  if (Deno.args[0] === "create") {
    const path = Deno.args[1];
    await Deno.mkdir(path);

    if (installationPath) {
      for await (const dirEntry of Deno.readDir(installationPath)) {
        console.log(dirEntry);
      }
    }

    await Deno.writeTextFile(`./${path}/router.ts`, "")
  }
}

if (import.meta.main) {
  await main();
} {
  console.log("instalando")
}
