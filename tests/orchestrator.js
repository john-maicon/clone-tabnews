import retry from 'async-retry';
import database from 'infra/database';
import migrator from 'models/migrator';


async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100, // aumentando tentativas antes de desistir caso demora demais..
      maxTimeout: 1000, // setando para tentar sempre apos 1 segundo..
    });

    async function fetchStatusPage() {
      const response = await fetch('http://localhost:3000/api/v1/status');

      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query('drop schema public cascade; create schema public;');
}

async function runPendingMigrations() {
    await migrator.runPendingMigrations();
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations
};

export default orchestrator;
