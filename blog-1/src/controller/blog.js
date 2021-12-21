const {
  exec
} = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select id, title, content, author from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and tile like'%${keyword}%' `
  }
  sql += `order by createtime desc;`
  return exec(sql) // promise
}

const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData) => {
  let sql = `insert into blogs (title, content, createtime, author) values ('${blogData.title}', '${blogData.content}', ${Date.now()}, '${blogData.author}')`
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  let sql = `update blogs set title='${blogData.title}', content='${blogData.content}' where id=${id}`
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    } else {
      return false
    }
  })
}

const deleteBlog = (id, author) => {
  let sql = `
    delete from blogs where id=${id} and author='${author}'
  `
  return exec(sql).then(deleteData => {
    if (deleteData.affectedRows > 0) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}