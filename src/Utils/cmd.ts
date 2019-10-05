import { spawn } from "child_process";

export default (command: string, args: string[], options: any) => {
  return new Promise(async (resolve, reject) => {
    const process: any = spawn(command, args, options);
    const output: string[] = [];

    console.log(`cmd: ${command}`);

    process.stdout.on("data", (data: any) => {
      console.log(data.toString());
    });

    process.stderr.on("data", (data: any) => {
      console.log(data.toString());
      reject(data.toString());
    });

    process.on("close", (data: any) => {
      if (Number(data.toString()) !== 0) {
        // При выполнении скрипта произошла ошибка
        reject(`Что-то пошло не так, скрипт завершился с кодом ${data.toString()}...`);
      } else {
        // Скрипт успешно выполнен
        resolve(true);
      }
    });
  });
}