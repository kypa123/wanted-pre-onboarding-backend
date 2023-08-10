async function get(endpoint, params = '') {
    const apiUrl = `${endpoint}/${params}`;
    const res = await fetch(apiUrl);
    const result = await res.json();

    return result;
}

async function post(endpoint, data, contentType = '') {
    const apiUrl = endpoint;
    if (contentType == 'meme') {
        const res = await fetch(apiUrl, {
            method: 'POST',
            body: data,
        });
        return await res.json();
    } else {
        const bodyData = JSON.stringify(data);
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: bodyData,
        });

        return await res.json();
    }
}

async function patch(endpoint, params = '', data) {
    const apiUrl = `${endpoint}/${params}`;

    const bodyData = JSON.stringify(data);

    const res = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: bodyData,
    });

    if (!res.ok) {
        const errorContent = await res.json();
        const { reason } = errorContent;

        throw new Error(reason);
    }

    const result = await res.json();

    return result;
}

async function del(endpoint, params = '', data = {}) {
    const apiUrl = `${endpoint}/${params}`;
    const bodyData = JSON.stringify(data);

    const res = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: bodyData,
    });

    if (!res.ok) {
        const errorContent = await res.json();
        const { reason } = errorContent;

        throw new Error(reason);
    }

    const result = await res.json();

    return result;
}

export { get, post, patch, del as delete };
