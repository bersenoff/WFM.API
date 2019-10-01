type TParams = string[];
type TBody = { [key: string]: any };

/**
 * @description Проверка обязательных параметров
 * @param {TParams} params Список обязательных параметров
 * @param {TBody} body Список параметров пришедших в запросе
 * @result Вернет ошибку если нет обязательных параметров или просто отработает, если параметры прошли проверку
 */
const checkParams = (params: TParams, body: TBody) => {
  const notTransmitted: string[] = [];

  if (typeof params !== "undefined") params.push("token");
  else params = ["token"];

  if (typeof body.token === "undefined") notTransmitted.push("token");
  else if (body.token !== process.env.SYSTEM_TOKEN) throw new Error("Неверный токен");

  if (Object.keys(body).length) {
    for (let param of params) {
      if (typeof body[param] === "undefined" || !String(body[param]).length) {
        notTransmitted.push(param);
      }
    }
  } else {
    throw Error(`Не переданы обязательные параметры: ${params.join(", ")}`);
  }

  if (notTransmitted.length) {
    throw Error(`Не переданы обязательные параметры: ${notTransmitted.join(", ")}`);
  }
};

export default checkParams;
