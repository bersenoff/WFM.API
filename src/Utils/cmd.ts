import { spawn } from "child_process";

export default (command: string, args: string[], options: any) => {
  return new Promise(async (resolve, reject) => {
    const process: any = spawn(command, args, options);
    const output: string[] = [];

    process.stdout.on("data", (data: any) => {
      data = data.toString();
      output.push(data);
      resolve(data);
    });

    process.stderr.on("data", (data: any) => {
      reject(data.toString());
    });

    process.on("close", (data: any) => {
      if (Number(data.toString()) !== 0) {
        // При выполнении скрипта произошла ошибка
        reject(`Процесс завершен с кодом: ${data.toString()}`);
      } else {
        // Скрипт успешно выполнен
        resolve(output);
      }
    });
  });
}