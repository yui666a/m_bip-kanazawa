function doMain(e) {
  const mode = e.parameter.mode;

  let response;
  switch (mode) {
    case "users":       response = getUsers(); break;
    case "user":        response = getUserById(e.parameter.id); break;
    case "login":       response = tryLogin(e); break;
    case "sign-up":     response = createUser(e); break;

    case "jobs":        response = getJobs(); break;
    case "job":         response = getJobById(e.parameter.id); break;
    case "create-job":  response = createJob(e); break;

    case "ideas":       response = getIdeas(); break;
    case "idea":        response = getIdeaById(e.parameter.id); break;
    case "create-idea": response = createIdea(e); break;
  }
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return doMain(e)
}

function doPost(e) {
  return doMain(e)
}
