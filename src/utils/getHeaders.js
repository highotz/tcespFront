const token = localStorage.getItem('token');
const idUserStorage = localStorage.getItem('idUser');
const headers = {
  headers: {
    authorization: `Bearer ${token.replaceAll('"', '')}`,
    userId: idUserStorage.replaceAll('"', ''),
  },
};
export default headers;
