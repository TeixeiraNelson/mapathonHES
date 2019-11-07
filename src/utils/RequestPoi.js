export class requestPOI {
    //Create a new POI in the Database
    // Fetches its categories and tags as well...
    static async addPOI(newPOI, getTokenSilently, loginWithRedirect) {

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
            console.log(data);

            console.log("INSERTING POI Status");
            console.log("Body:" + JSON.stringify(newPOI.Status));

            let response2 = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi/${data.id}/status`, {
                method: "PATCH",
                body: JSON.stringify(newPOI.Status),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });


            let data2 = await response2.json();
            console.log(data2);


            let response3 = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi/${data.id}/category`, {
                method: "PATCH",
                body: JSON.stringify(newPOI.Categories),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("INSERTING POI Categories");
            let data3 = await response3.json();
            console.log(data3);

            let response4 = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi/${data.id}/tag`, {
                method: "PATCH",
                body: JSON.stringify(newPOI.Tags),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("INSERTING POI Tags");
            let data4 = await response4.json();
            console.log(data4);

        } catch (e) {
            console.error(e);
            await loginWithRedirect();
            return null;
        }
    }

    //Update some Information for a POI
    static async updatePOI(id, updatedPOI, getTokenSilently, loginWithRedirect) {
        console.log("REQUEST ID " + id);
        console.log(updatedPOI);
        console.log("LAUNCHING REQUESTS");
        try {
            let token = await getTokenSilently();
            console.log(JSON.stringify(updatedPOI));
            let response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/poi/` + id,
                {
                    method: "PATCH",
                    body: JSON.stringify(updatedPOI),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            let data = await response.json();
            console.log("UPDATED POI")
            console.log(data);


            let response3 = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi/${id}/category`, {
                method: "PATCH",
                body: JSON.stringify(updatedPOI.Categories),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("updating POI Categories");
            console.log(updatedPOI.tags);
            let data3 = await response3.json();
            console.log(data3);

            let response4 = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi/${id}/tag`, {
                method: "PATCH",
                body: JSON.stringify(updatedPOI.Tags),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("updating POI Tags");
            let data4 = await response4.json();
            console.log(data4);
            data4.Creator = data.Creator;

            return data4;
        } catch (e) {
            console.error(e);
            await loginWithRedirect();
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

    // Get all available categories from DB
    static async getAllCategories(getTokenSilently, loginWithRedirect) {
        try {
            let token = await getTokenSilently();
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/category`, {
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

    // Getting GPX files, itineraries from db
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


    //Get Information from a POI with the Id as paratmeter
    static async getPOI(id, getTokenSilently, loginWithRedirect) {
        try {
            let token = await getTokenSilently();
            let response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/poi/${id}`,
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

    // Inserts a new category
    static async insertCategory(category, getTokenSilently, loginWithRedirect) {
        try {
            let token = await getTokenSilently();
            console.log("REQUEST ADD CATEGORY");
            console.log(category);
            console.log(JSON.stringify(category));

            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/category`, {
                method: "POST",
                body: JSON.stringify(category),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("INSERTING Category");
            let data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error(e);
            await loginWithRedirect();
            return null;
        }
    }


    // Inserts a new Tag
    static async insertTAg(tag, getTokenSilently, loginWithRedirect) {
        try {
            let token = await getTokenSilently();
            console.log(tag);
            console.log(JSON.stringify(tag));

            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/tag`, {
                method: "POST",
                body: JSON.stringify(tag),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("INSERTING Tag");
            let data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error(e);
            await loginWithRedirect();
            return null;
        }
    }


    static validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }
    
    static async likeFunction(id, getTockenSilently, loginWithRedirect) {
        try {
            let token = await getTockenSilently();
            console.log(id);
            console.log(JSON.stringify(id));
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi/${id}/like`,
                {
                    method: "PATCH",
                    body: JSON.stringify(id),
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log("POI Like");
            let data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error(e);
            await loginWithRedirect();
            return null;
        }
    }

    static async dislikeFunction(id, getTockenSilently, loginWithRedirect) {
        try {
            let token = await getTockenSilently();
            console.log(id);
            console.log(JSON.stringify(id));
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/poi/${id}/dislike`,
                {
                    method: "PATCH",
                    body: JSON.stringify(id),
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log("POI Dislike");
            let data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error(e);
            await loginWithRedirect();
            return null;
        }
    }

    static async UpdateStatus(IdStatus, id, getTockenSilently, loginWithRedirect) {
        try {
            let token = await getTockenSilently();
            console.log(IdStatus);
            console.log(JSON.stringify(IdStatus));
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/status/${id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify(IdStatus),
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log("POI Status change");
            let data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error(e);
            await loginWithRedirect();
            return null;
        }
    }
}

export default requestPOI;
