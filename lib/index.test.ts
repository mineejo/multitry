// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { wrap } from "./index.ts";

test("wrap: return result", () => {
  const result = wrap({
    try: () => "Hello world!",
  });

  const message = "Hello world!";
  expect(result).toBe(message);
});

test("wrap: async return result", async () => {
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        wrap({
          try: () => "Hello world!",
        })
      );
    }, 1);
  });

  const message = "Hello world!";
  expect(result).toBe(message);
});

test("wrap: multi return result", () => {
  const result = wrap(
    {
      try: () => undefined,
    },
    {
      try: () => "Hello world!",
    }
  );

  const message = "Hello world!";
  expect(result).toBe(message);
});

test("wrap: return error", () => {
  const error = wrap({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    try: () => world,
    catch: () => undefined,
    // finally: () => null,
  });

  const message = "world is not defined";
  expect(error?.["message"]).toBe(message);
});

test("wrap: async return error", async () => {
  const error = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        wrap({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          try: () => world,
          catch: () => undefined,
        })
      );
    }, 1);
  });

  const message = "world is not defined";
  expect(error?.["message"]).toBe(message);
});
