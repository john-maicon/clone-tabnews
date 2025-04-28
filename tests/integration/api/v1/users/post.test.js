import {version as uuidVersion} from 'uuid';
import orchestrator from 'tests/orchestrator.js';


beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe('POST /api/v1/users', () => {
  describe('Anonymous user', () => {

      test('With unique and valid data', async () => {

      
        const response = await fetch(
          'http://localhost:3000/api/v1/users',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: 'john',
              email: 'john@example.com',
              password: 'senha123',
            }) // JSON.stringify Pega objeto JS e transforma em uma string em json
          }
        );

        expect(response.status).toBe(201);

        const responseBody = await response.json();
       
        
        expect(responseBody).toEqual({
            id: responseBody.id,
            username: 'john',
            email: 'john@example.com',
            password: 'senha123',
            created_at: responseBody.created_at,
            updated_at: responseBody.updated_at
        });
        expect(uuidVersion(responseBody.id)).toBe(4);
        expect(Date.parse(responseBody.created_at)).not.toBeNaN();
        expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      });

      test('With duplicated email', async () => {
        const response1 = await fetch(
          'http://localhost:3000/api/v1/users',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: 'emailduplicado1',
              email: 'duplicado@example.com',
              password: 'senha123',
            }) 
          }
        );

        expect(response1.status).toBe(201);

        const response2 = await fetch(
          'http://localhost:3000/api/v1/users',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: 'emailduplicado2',
              email: 'Duplicado@example.com',
              password: 'senha123',
            }) 
          }
        );
        expect(response2.status).toBe(400);

        const response2Body = await response2.json();
        expect(response2Body).toEqual({
          name: 'ValidationError',
          message: 'O email informado já está sendo utilizado.',
          action: 'utilize outro email para realizar o cadastro',
          statusCode: 400,
        });

      });

      test('With duplicated username', async () => {
        const response1 = await fetch(
          'http://localhost:3000/api/v1/users',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: 'usernameduplicado',
              email: 'usernameduplicado1@example.com',
              password: 'senha123',
            }) 
          }
        );

        expect(response1.status).toBe(201);

        const response2 = await fetch(
          'http://localhost:3000/api/v1/users',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: 'Usernameduplicado',
              email: 'usernameduplicado2@example.com',
              password: 'senha123',
            }) 
          }
        );
        expect(response2.status).toBe(400);

        const response2Body = await response2.json();
        expect(response2Body).toEqual({
          name: 'ValidationError',
          message: 'O username informado já está sendo utilizado.',
          action: 'utilize outro username para realizar o cadastro',
          statusCode: 400,
        });

      });

    });
  });

