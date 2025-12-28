import { exec } from "child_process";

const proc = exec("npm start", { cwd: "./backend" });
process.on("exit", () => proc.kill());
