import { baseService } from '../base'
export const UserService: any = {}

interface LoginInput {
  username: string,
  password: string
}

UserService.login = (data: LoginInput) => {
  return baseService({
    url: '/users/login',
    data
  })
}