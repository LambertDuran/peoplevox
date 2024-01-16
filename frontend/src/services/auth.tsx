interface IUser {
  email: string;
  surname: string;
  name: string;
}

function setCurrentUser(user: IUser) {
  localStorage.setItem("email", user.email);
  localStorage.setItem("surname", user.surname);
  localStorage.setItem("name", user.name);
}

function getCurrentUser(): IUser | null {
  const email = localStorage.getItem("email");
  const surname = localStorage.getItem("surname");
  const name = localStorage.getItem("name");

  return !email && !surname && !name
    ? null
    : {
        email: email!,
        surname: surname!,
        name: name!,
      };
}

function removeCurrentUser() {
  localStorage.removeItem("email");
  localStorage.removeItem("surname");
  localStorage.removeItem("name");
}

function isUserConnected() {
  const email = localStorage.getItem("email");
  const surname = localStorage.getItem("surname");
  const name = localStorage.getItem("name");

  return email !== null && surname !== null && name !== null;
}

const auth = {
  setCurrentUser,
  getCurrentUser,
  removeCurrentUser,
  isUserConnected,
};

export default auth;
