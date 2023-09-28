export function log(...args: any) {
  if (process.env.NEXT_PUBLIC_ACTIVE_DEBUG === 'true') {
    console.log(...args);
  }
}
