import { createResource, findResources, updateResource } from "@/server/controllers/resourcesController";
export async function POST(request) {
    try {
        const resource = await request.json();
        const savedResource = createResource(resource);
        return Response.json({ success: true, data: savedResource }, { status: 201 });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 })
    }
}

export async function GET() {
    try {
        const resources = await findResources();
        return Response.json({ success: true, data: resources }, { status: 200 });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 })
    }
}

export async function PUT(request) {
    try {
        const resource = await request.json();
        const updatedResource = await updateResource(resource);
        return Response.json({ success: true, data: updatedResource }, { status: 200 });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 })
    }
}

