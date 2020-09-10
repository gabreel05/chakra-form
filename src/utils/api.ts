interface Data {
  email: string
  password: string
}

export async function login({ email, password }: Data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      email === 'gabriel@mountech.com.br' && password === '123456'
        ? resolve()
        : reject()
    }, 3000)
  })
}
