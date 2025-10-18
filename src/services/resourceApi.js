export async function postResource(resource) {
    try {
        const res = await fetch('/api/resources', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resource),
        })
        if (!res.ok) throw new Error('Failed to post resource')
        return await res.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}
export async function getResources() {
    try {
        const res = await fetch('/api/resources', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!res.ok) throw new Error('Failed to fetch resources')
        const resources = await res.json()
        return resources.data;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function putResource(resource) {
    try {
        const res = await fetch('/api/resources', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resource),
        })
        if (!res.ok) throw new Error('Failed to update resource')
        return await res.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}