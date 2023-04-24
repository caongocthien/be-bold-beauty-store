export const saveJwtToLocalStorage = (jwt: string) => {
  return localStorage.setItem('jwt', jwt)
}

export const removeJwtToLocalStorage = () => {
  return localStorage.removeItem('jwt')
}

export const getJwtToLocalStorage = () => {
  return localStorage.getItem('jwt')
}
