export default function debounce<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  debounceTime = 0,
): (...args: Parameters<T>) => void {
  let setTimeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (setTimeoutId) clearTimeout(setTimeoutId);

    setTimeoutId = setTimeout(
      async () => await fn.apply(this, args),
      debounceTime,
    );
  };
}
