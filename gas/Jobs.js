const jobSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(JOBS)

function getJobs() {
  // const lastCol = 7
  // const data_set = jobSheet.getRange(1, 1, jobSheet.getLastRow(), lastCol).getValues();
  const data_set = jobSheet.getDataRange().getValues();

  // remove the row of column name
  data_set.shift()

  return data_set.map((data) => {
    return {
      id: data[0],
      status: data[1],
      title: data[2],
      category: data[3],
      author: getUserById(data[4]),
      detail: data[5],
      reward: data[6],
    }
  })
}

/**
 * mode=create-job&title=aaa&category=bbb&author_id=ccc&detail=ddd&reward=eee
 */
function createJob(e) {
  // 途中の行が削除されない限り有効
  id = jobSheet.getLastRow()
  status = "published"

  // 以下はparamterで受け取る
  title = e.parameter.title
  category = e.parameter.category
  author_id = e.parameter.author_id
  detail = e.parameter.detail
  reward = e.parameter.reward
  jobSheet.appendRow([id, status, title, category, author_id, detail, reward]);
  return {
    status: 200,
    message: "success",
    id: id
  }
}

/**
 * 
 */
function getJobById(id) {
  const items = getJobs().filter((item) => item.id == id)
  if (items.length == 0) {
    return "job not found"
  } else {
    return items[0]
  }
}
