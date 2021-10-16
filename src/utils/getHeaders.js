/* eslint-disable import/no-mutable-exports */
const token = localStorage.getItem('token');
const idUserStorage = localStorage.getItem('idUser');
let headers;
if (!token || !idUserStorage) {
  headers = {
    headers: {
      authorization: `Bearer ''`,
      userId: '',
    },
  };
} else {
  headers = {
    headers: {
      authorization: `Bearer ${token.replaceAll('"', '')}`,
      userId: idUserStorage.replaceAll('"', ''),
    },
  };
}

export default headers;
