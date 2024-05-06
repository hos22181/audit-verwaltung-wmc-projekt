

export const getMe = async () => {
  const req = await fetch('http://localhost:3000/api/users/me', {
    method: 'GET',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (req.status === 401) throw new Error("User not authenticated!")
  const data = await req.json()
  return data;
}

export const login = async (email: string, password: string) => {
  const req = await fetch('http://localhost:3000/api/users/login', {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    }),
  })
  if (req.status !== 200) throw new Error("There was an error!")
  const data = await req.json()
  return data;
}

export const register = async (email: string, password: string) => {
  const req = await fetch('http://localhost:3000/api/users', {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    }),
  })
  if (req.status !== 201) throw new Error("There was an error!")
  const data = await req.json()
  return data;
}