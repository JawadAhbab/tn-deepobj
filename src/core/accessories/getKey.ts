export const getkey = (key: string | number) => {
  const intkey = parseInt(key as string)
  if (intkey.toString() === key) return intkey
  return key
}
