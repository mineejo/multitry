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
 * @returns The multitry function can return a value of type Type,
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
