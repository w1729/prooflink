const verifyFetch = async ({
    url,
    method,
    headers,
    body
}) => {
    let result = {
        status: 'error',
        messagge: 'Something went wrong',
        data: null
    };

    try {
        const response = await fetch(url, {
            "method": method,
            "headers": {...headers} || undefined,
            "body": body || undefined
        });
        const data = await response.json();
        result = {
            status: 'success',
            message: 'Fetch successful',
            data: data
        };
    } catch (error) {
        console.error(error);
        console.error(error.message);
        result = {
            status: 'error',
            message: error.message,
            data: null
        };
    } finally {
        console.log('success', result);
    }
    return result;
}

export default verifyFetch;