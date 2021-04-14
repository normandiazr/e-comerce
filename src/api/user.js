import { API_URL } from "../utils/constants";

export async function registerAPI( formData ) {

    try {
        console.log("enviando");
        const url = `${API_URL}/auth/local/register`;
        const params  = {
            method: "POST",
            Headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify( formData ),
            
        };
        const response = await fetch( url, params ) ;
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log("hay eroor...."+ error );
        return null;
    }


}