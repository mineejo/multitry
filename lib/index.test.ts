import { wrap } from "./index.js";
import test from "ava";

test("return result", (t) => {
  const result = wrap({
    try: () => "Hello world!",
  });

  const message = "Hello world!";
  t.is(result, message);
});

test("async return result", async (t) => {
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
  t.is(result, message);
});

test("multi return result", (t) => {
  const result = wrap(
    {
      try: () => undefined,
    },
    {
      try: () => "Hello world!",
    }
  );

  const message = "Hello world!";
  t.is(result, message);
});

test("return error", (t) => {
  const error = wrap({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    try: () => world,
    catch: () => undefined,
    // finally: () => null,
  });

  const message = "world is not defined";
  t.is(error?.["message"], message);
});

test("async return error", async (t) => {
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
  t.is(error?.["message"], message);
});
