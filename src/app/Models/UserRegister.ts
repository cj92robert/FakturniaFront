export class UserRegister{
  constructor(nickname, password, email) {
    this.nickname = nickname;
    this.password = password;
    this.email = email;
  }

  nickname: string;
  password: string;
  email: string;
}
