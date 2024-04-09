export function setIntoLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value)
}

export function getFromLocalStorage(key: string): string | null {
  return localStorage.getItem(key)
}