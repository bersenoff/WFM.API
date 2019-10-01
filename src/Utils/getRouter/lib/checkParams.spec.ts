import checkParams from "./checkParams";

describe("Проверка входящих параметров в роутах", () => {
  it("С параметрами", () => {
    const fn = jest.fn(checkParams);

    fn(["one"], { one: "one" });

    expect(fn).toHaveReturned();
  });

  it("Без параметров", () => {
    const fn = () => {
      checkParams(["one"], {});
    };

    expect(fn).toThrowError();
  });

  it("Без обязательных параметров, но с другими", () => {
    const fn = () => {
      checkParams(["one"], { two: "two" });
    };

    expect(fn).toThrowError();
  });
});
