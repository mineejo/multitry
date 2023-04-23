/**
 * The wrap function is a wrapper for a functional try-catch-finally
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
 * @returns The wrap function can return a value of type,
 * an Error object, or undefined.
 */
export function wrap<Type>(
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
 * The Wrap function is a wrapper for wrap that allows for
 * try, catch, and finally blocks in jsx/tsx.
 *
 * @param {{
 *     try: () => string | void;
 *     catch?: (error: Error) => Error | string;
 *     finally?: () => void;
 *   }[]} blocks - blocks is an array of objects, where each object
 *   represents a function to be executed in a try-catch-finally block.
 *   Each object should have a try property, which is a function that
 *   will be executed in the try block. It can also have an optional
 *   catch property.
 *
 * @returns The `Wrap` function returns a string, an Error object, or undefined.
 */
export function Wrap(blocks: {
  try: () => string | void;
  catch?: (error: Error) => Error | string;
  finally?: () => void;
}): string | Error | undefined {
  return wrap({
    try: () => {
      if (blocks?.["try"]) {
        return `${blocks["try"]()}`;
      }
      return "";
    },
    catch: (e) => {
      if (blocks?.["catch"]) {
        return `${blocks["catch"](e)}`;
      }
      return e.toString();
    },
    finally: () => {
      if (blocks?.["finally"]) {
        blocks["finally"]();
      }
      return "";
    },
  });
}
