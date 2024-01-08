export function log(...args: any) {
  if (process.env.NEXT_PUBLIC_ACTIVATE_DEBUG === 'true') {
    console.log(...args);
  }
}
