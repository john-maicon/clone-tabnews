function status(request, response) {
  //response.status(200).send("ok você é foda");
  response.status(200).json({ chave: "ok você é foda" });
}

export default status;
