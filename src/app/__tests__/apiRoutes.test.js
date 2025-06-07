import { URL } from 'url';
function createMockRequest(url) {
  const parsedUrl = new URL(url, 'http://localhost');
  return {
    nextUrl: parsedUrl,
    method: 'GET',
  };
}
describe("API Routes", () => {
  let GET;

  beforeAll(async () => {
    ({ GET } = await import('../api/export-docsAll/route.js'));
  });
  it("should return a 200 status for the /api/export-docsAll", async () => {

    const request = createMockRequest(`/api/export-docsAll?rootFolderId=${process.env.TEST_API_FOLDER_ID}`);

    const response = await GET(request);
    const data = await response.json();
    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  });
});