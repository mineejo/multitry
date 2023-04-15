/**
 * The multitry function is a wrapper for a functional try-catch-finally
 * construction that returns a value or undefined in case of an error
 * without handling the Error object.
 *
 * @param {{
 *     try: () => Type;
 *     catch?: (error: Error) => Error | Type;
 *     finally?: () => void;
 *   }[]} blocks - blocks is an array of objects, where each object
 *   represents a function to be executed in a try-catch-finally block.
 *   Each object should have a try property, which is a function that
 *   will be executed in the try block. It can also have an optional
 *   catch property.
 *
 * @returns The multitry function can return a value of type,
 * an Error object, or undefined.
 */
export function multitry<Type>(
  ...blocks: {
    try: () => Type;
    catch?: (error: Error) => Error | Type;
    finally?: () => void;
  }[]
): Type | Error | undefined {
  for (const block of blocks) {
    try {
      const result = block.try();
      if (result) {
        return result;
      }
    } catch (error) {
      if (block.catch) {
        return block.catch(error) ?? error;
      }
    } finally {
      if (block.finally) {
        block.finally();
      }
    }
  }
  return;
}

/**
 * The Multitry function is a wrapper for multitry that allows for
 * try, catch, and finally blocks in jsx/tsx.
 *
 * @param {{
 *     try: () => string;
 *     catch?: (error: Error) => Error | string;
 *     finally?: () => void;
 *   }[]} blocks - blocks is an array of objects, where each object
 *   represents a function to be executed in a try-catch-finally block.
 *   Each object should have a try property, which is a function that
 *   will be executed in the try block. It can also have an optional
 *   catch property.
 *
 * @returns The `Multitry` function is returning the result of calling
 * the `multitry` function with an object containing a `try` function,
 * a `catch` function (if provided), and a `finally` function
 * (if provided). The `try` function is the only required
 * property and is expected to return a string.
 * The `catch` function, if provided, takes an `Error
 */
export function Multitry(blocks: {
  try: () => string;
  catch?: (error: Error) => Error | string;
  finally?: () => void;
}) {
  return multitry({
    try: () => blocks["try"](),
    catch: (e) => (blocks?.["catch"] ? blocks["catch"](e) : e.toString()),
    finally: () => (blocks?.["finally"] ? blocks["finally"]() : ""),
  });
}
