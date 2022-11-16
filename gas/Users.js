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
      userId: data[1],
      name: data[2],
      belong: data[3],
      self_introduce: data[4],
      isStudent: data[5],
      password: data[6],
    }
  })
}

function tryLogin(e) {
  id = e.parameter.id;
  passwd = e.parameter.password;

  let users = getUsers().filter((user) => user.userId == id)
  if (users.length == 0) {
    return "user not fount"
  } else {
    user = users[0]
    return user.password === passwd ? user : "password incorrect"
  }
}

/**
 * mode=create-user&name=aaa&belong=bbb&self_introduce=ccc&isStudent=true&password=ddd
 */
function createUser(e) {
  // 途中の行が削除されない限り有効
  id = userSheet.getLastRow()
  // 以下はparamterで受け取る
  userId = e.parameter.userId
  name = e.parameter.name
  belong = e.parameter.belong
  self_introduce = e.parameter.self_introduce
  isStudent = e.parameter.isStudent
  password = e.parameter.password

  userSheet.appendRow([id, userId, name, belong, self_introduce, isStudent, password]);
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
  const items = getUsers().filter((item) => item.userId == id)
  if (items.length == 0) {
    return "user not found"
  } else {
    return items[0]
  }
}
