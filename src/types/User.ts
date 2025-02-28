enum Role {
  Guest = 'Guest',
  User = 'User',
  Admin = 'Admin'
}

interface User {
  id: string
  password: string
  role: Role
}

export { Role, type User }
