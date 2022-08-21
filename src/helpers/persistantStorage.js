export function getItem(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    console.log(error)
    return null
  }
}

export function setItem(key, data) {
  try {
    return localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.log(error)
    return null
  }
}
