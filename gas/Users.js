const userSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(USERS)

function getUsers() {
  // const lastCol = 6
  // const data_set = userSheet.getRange(1, 1, jobSheet.getLastRow(), lastCol).getValues();
  const data_set = userSheet.getDataRange().getValues();

  // remove the row of column name
  data_set.shift()

  return data_set.map((data) => {
    return {
      id: data[0],
      name: data[1],
      belog: data[2],
      self_introduce: data[3],
      isStudent: data[4],
      password: data[5],
    }
  })
}

function tryLogin(e) {
  id = e.parameter.id;
  passwd = e.parameter.password;

  let users = getUsers().filter((user) => user.id == id)
  if (users.length == 0) {
    return "user not fount"
  } else {
    user = users[0]
    return user.password === passwd ? user : "password incorrect"
  }
}

/**
 * mode=create-user&name=aaa&belog=bbb&self_introduce=ccc&isStudent=true&password=ddd
 */
function createUser(e) {
  // 途中の行が削除されない限り有効
  id = userSheet.getLastRow()

  // 以下はparamterで受け取る
  name = e.parameter.name
  belog = e.parameter.belog
  self_introduce = e.parameter.self_introduce
  isStudent = e.parameter.isStudent
  password = e.parameter.password

  userSheet.appendRow([id, name, belog, self_introduce, isStudent, password]);
  return {
    status: 200,
    message: "success",
    id: id
  }
}

/**
 * 
 */
function getUserById(id) {
  const items = getUsers().filter((item) => item.id == id)
  if (items.length == 0) {
    return "user not found"
  } else {
    return items[0]
  }
}
