// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { multitry } from "./index.ts";

test("multitry: return result", () => {
  const result = multitry({
    try: () => "Hello world!",
  });

  const message = "Hello world!";
  expect(result).toBe(message);
});

test("multitry: async return result", async () => {
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        multitry({
          try: () => "Hello world!",
        })
      );
    }, 1);
  });

  const message = "Hello world!";
  expect(result).toBe(message);
});

test("multitry: multi return result", () => {
  const result = multitry(
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

test("multitry: return error", () => {
  const error = multitry({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    try: () => world,
    catch: () => undefined,
    // finally: () => null,
  });

  const message = "world is not defined";
  expect(error?.["message"]).toBe(message);
});

test("multitry: async return error", async () => {
  const error = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        multitry({
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
