import database from "/infra/database";

async function status(req, res) {
  const result = await database.query("SELECT 1 + 5;");
  console.log(result.rows);

  res.status(200).json({ name: "John Doe" });
}

export default status;
