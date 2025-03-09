import orchestrator from 'tests/orchestrator.js';

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test('POST to /api/v1/status', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status', {
    method: 'POST',
  });

  expect(response.status).toBe(405);

  const responseBody = await response.json();

  expect(responseBody).toEqual({
    name: 'MethodNotAllowedError',
    message: 'Método não permitido para este endpoint',
    action: 'Verifique se método HTTP enviado é válido para este endpoint',
    statusCode: 405,
  });
});
