export class requestPOI {
    //Create a new POI in the Database
    static async setPOI(newPOI, getTokenSilently, loginWithRedirect) {

        try {
            let token = await getTokenSilently();
            console.log(newPOI);
            console.log(JSON.stringify(newPOI));
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi`, {
                method: "POST",
                body: JSON.stringify(newPOI),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("INSERTING POI");
            let data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
            await loginWithRedirect();
            return null;
        }
    }
    //Update some Information for a POI
    static async updatePOI(id, updatePOI, getTokenSilently, loginWithRedirect) {
        try {
            let token = await getTokenSilently();
            console.log(JSON.stringify(updatePOI));
            let response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/poi/` + id,
                {
                    method: "PATCH",
                    body: JSON.stringify(updatePOI),
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            let data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
            //await loginWithRedirect();
            return null;
        }
    }
    //Return all POIs from the Database
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

    static async getGPXFiles(getTokenSilently, loginWithRedirect) {
        try {
            let token = await getTokenSilently();
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/gpx-file`, {
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


    //Get some Information from a POI with the Id as paratmeter
    static async getPOI(id, getTokenSilently, loginWithRedirect) {
        try {
            let token = await getTokenSilently();
            let response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/poi/` + id,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            let data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
            await loginWithRedirect();
        }
    }
    //Delete a POI in the Database
    static async deletePOI(id, getTokenSilently, loginWithRedirect) {
        try {
            let token = await getTokenSilently();
            let response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/poi/` + id,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            let data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
            await loginWithRedirect();
        }
    }
}
export default requestPOI;
