export class requestPOI {
  static async setPOI(newPOI, getTokenSilently, loginWithRedirect) {
    try {
      let token = await getTokenSilently();
      console.log(JSON.stringify(newPOI));
      let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi`, {
        method: "POST",
        body: JSON.stringify(newPOI),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      await loginWithRedirect();
    }
  }
  static async getAllPOI(getTokenSilently, loginWithRedirect) {
    try {
      let token = await getTokenSilently();
      let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      await loginWithRedirect();
    }
  }
}
export default requestPOI;
