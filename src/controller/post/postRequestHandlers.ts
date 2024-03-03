import { db } from 'src/main';

export function addUserToTheDb(data) {
  const newUser = {
    login: data.login,
    password: data.password,
  };
  db.addUser(newUser);
}
