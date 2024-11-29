import useSWR from 'swr';

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdateAt() {
  const { isLoading, data } = useSWR('/api/v1/status', fetchAPI, {
    refreshInterval: 2000,
  });

  let UpdateAtText = 'carregando...';
  let maxConnections = 'carregando...';
  let openedConnections = 'carregando...';
  let version = 'carregando...';

  if (!isLoading && data) {
    UpdateAtText = new Date(data.updated_at).toLocaleString('pt-BR');
    maxConnections = data.dependencies.database.max_connections;
    openedConnections = data.dependencies.database.opened_connections;
    version = data.dependencies.database.version;
  }

  return (
    <>
      <div>Última atualização: {UpdateAtText}</div>
      <div>Máximo de conexão: {maxConnections}</div>
      <div>Conexões abertas: {openedConnections}</div>
      <div>Versão: {version}</div>
    </>
  );
}

function StatusPage() {
  return (
    <>
      <h1>Página Status</h1>
      <h1>Serviços</h1>
      <UpdateAt />
    </>
  );
}

export default StatusPage;
