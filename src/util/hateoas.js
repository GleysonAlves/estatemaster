const generateHateoasLinks = (resource, id) => {
    return [
        {
            rel: 'all',
            method: 'GET',
            href: `/${resource}`
        },
        {
            rel: 'self',
            method: 'GET',
            href: `/${resource}/${id}`
        },
        {
            rel: 'create',
            method: 'POST',
            href: `/${resource}`
        },
        {
            rel: 'update',
            method: 'PUT',
            href: `/${resource}/${id}`
        },
        {
            rel: 'delete',
            method: 'DELETE',
            href: `/${resource}/${id}`
        }
    ]
}

module.exports = {generateHateoasLinks};