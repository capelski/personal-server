declare const toastr: any;

interface ParsedResponse {
    status: number;
    payload?: any;
}

export const get = (url: string, parameters?: any, defaultValue?: any, errorMessage?: string) => {        
    const options: RequestInit = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'include'
    };

    parameters = parameters || {};
    parameters.$modena = 'webjack-api';

    url += '?';
    for (var key in parameters) {
        var parameter = parameters[key];
        if (parameter) {
            url += (key + '=' + encodeURIComponent(parameter) + '&');
        }
    }
    url = url.substring(0, url.length - 1);

    errorMessage = errorMessage || 'An unexpected error occurred';
    
    return fetch(url, options)
    .then(response => {
        return response.json()
            .then(payload => ({ status: response.status, payload } as ParsedResponse))
            .catch(parsingError => ({ status: response.status } as ParsedResponse));
    })
    .then((parsedResponse: ParsedResponse) => {
        if (parsedResponse.status != 200) {
            errorMessage = parsedResponse.payload.message || errorMessage;
            toastr.error(errorMessage, 'Network error');
            return defaultValue;
        }
        else {
            return parsedResponse.payload;
        }
    })
    .catch((erroraco) => {
        console.log(erroraco)
        toastr.error(errorMessage, 'Network error');
        return defaultValue;
    });
};
