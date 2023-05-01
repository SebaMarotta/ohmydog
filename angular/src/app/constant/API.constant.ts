export const API_MASCOTAS = {
  URL: 'http://localhost:4200',

  REGISTRO_MASCOTA: function () {
    return `${this.URL}/mascota/registro`;
  },

  MASCOTA_BY_ID: function (id) {
    return `${this.URL}/mascota/${id}`;
  },
};

export const API_USERS = {
  URL: 'http://localhost:4200',

  REGISTRO_USER: function () {
    return `${this.URL}/user/register`;
  },

  USER_BY_USERNAME: function (username) {
    return `${this.URL}/user/${username}`;
  },
};

export const API_AUTH = {
  URL: 'http://localhost:4200',

  REGISTRO_USER: function () {
    return `${this.URL}/user/register`;
  },

  USER_BY_USERNAME: function (username) {
    return `${this.URL}/user/${username}`;
  },
};
