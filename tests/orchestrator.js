import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100, // aumentando tentativas antes de desistir caso demora demais.. 
      maxTimeout: 1000, // setando para tentar sempre apos 1 segundo.. 
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

export default {
  waitForAllServices,
};