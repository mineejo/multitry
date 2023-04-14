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
export function multitry<Type>(construct: {
  try: () => Type;
  catch?: (error: Error) => Type | Error;
  finally?: () => void;
}): Type | Error | undefined {
  try {
    return construct.try();
  } catch (error) {
    if (construct.catch) return construct.catch(error) ?? error;
  } finally {
    if (construct.finally) construct.finally();
  }
  return;
}
