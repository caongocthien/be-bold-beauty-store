export const saveJwtToLocalStorage = (jwt: string) => {
  return localStorage.setItem('jwt', jwt)
}

export const removeJwtToLocalStorage = () => {
  return localStorage.removeItem('jwt')
}

export const getJwtToLocalStorage = () => {
  return localStorage.getItem('jwt')
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: number }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-t-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-t-')
  return arr[arr.length - 1]
}

export const convertQueryStringToQueryObj = (qs: string) => {
  const params = new URLSearchParams(qs)
  return Object.fromEntries(params)
}
