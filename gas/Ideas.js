const ideaSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(IDEAS)

function getIdeas() {
  // const lastCol = 6
  // const data_set = ideaSheet.getRange(1, 1, ideaSheet.getLastRow(), lastCol).getValues();
  const data_set = ideaSheet.getDataRange().getValues();
  
  // remove the row of column name
  data_set.shift()

  return data_set.map((data) => {
    return {
      id: data[0],
      author_id: data[1],
      jobs_id: data[2],
      title: data[3],
      detail: data[4],
      status: data[5],
    }
  })
}

/**
 * 
 * exapmle: 
 * mode=create-idea&author_id=aaa&jobs_id=bbb&ccc&title=ccc&detail=ddd
 */
function createIdea(e) {
  // 途中の行が削除されない限り有効
  id = ideaSheet.getLastRow()

  // 以下はparamterで受け取る
  author_id = e.parameter.author_id
  jobs_id = e.parameter.jobs_id
  title = e.parameter.title
  detail = e.parameter.detail

  ideaSheet.appendRow([id, author_id, jobs_id, title, detail]);
  return {
    status: 200,
    message: "success",
    id: id
  }
}

/**
 * 
 */
function getIdeaById(e) {
  const id = e.parameter.id;

  const items = getIdeas().filter((item) => item.id == id)
  if (items.length == 0) {
    return "idea not found"
  } else {
    return items[0]
  }
}








