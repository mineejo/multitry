/**
 * Functional try-catch-finally construction wrapper.
 *
 * @param construct - Contains construct functions.
 * @param construct.try - Returns value, works like normal.
 * @param [construct.catch] - Includes an error argument, returns an `Error` or value when handled.
 * @param [construct.finally] - Does return void, works like normal.
 *
 * @returns a value or `undefined`, in case of an error without handling the `Error` object.
 */
export function multitry<Type>(
  ...construct: {
    try: () => Type;
    catch?: (error: Error) => Error | Type;
    finally?: () => void;
  }[]
): Type | Error | undefined {
  for (const c of construct) {
    try {
      const result = c.try();
      if (result) return result;
    } catch (error) {
      if (c.catch) return c.catch(error) ?? error;
    } finally {
      if (c.finally) c.finally();
    }
  }
  return;
}
