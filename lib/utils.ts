export function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ')
}

export function msToSeconds(ms: number) {
  return Math.max(0, Math.ceil(ms / 1000))
}

export function nowMs() {
  return Date.now()
}
