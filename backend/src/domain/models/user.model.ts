export default class UserModel {
  id: string | undefined
  email: string
  name: string
  password: string

  constructor(email: string, name: string, password: string) {
    this.email = email
    this.name = name
    this.password = password
  }

  static createUser(email: string, name: string, password: string) {
    return new UserModel(email, name, password)
  }
}
