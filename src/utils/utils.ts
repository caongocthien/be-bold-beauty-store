export const saveJwtToLocalStorage = (jwt: string) => {
  return localStorage.setItem('jwt', jwt)
}

export const removeJwtToLocalStorage = () => {
  return localStorage.removeItem('jwt')
}

export const getJwtToLocalStorage = () => {
  return localStorage.getItem('jwt')
}

export const getUserToLocalStorage = () => {
  return localStorage.getItem('user')
}

export const setUserToLocalStorage = (user: string) => {
  return localStorage.setItem('user', user)
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

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('en-US').format(number)
}
