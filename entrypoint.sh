#!/bin/bash -xe

echo "🔴 Aguardando o Postgres aceitar conexões TCP/IP..."

dockerize -wait tcp://postgres-dev:5432 -timeout 60s

# Verificar se PostgreSQL está aceitando conexões via TCP/IP
until pg_isready -h postgres-dev -p 5432; do
    >&2 echo "Postgres não está pronto ainda - esperando..."
    sleep 2
done

echo "🟢 Postgres está pronto e aceitando conexões!"
npm run dev


# #!/bin/bash -xe

# # node index
# npm run dev

