const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    //  获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        const res = getList(author, keyword)
        return res.then(listData => {
            return new SuccessModel(listData)
        })
    }
    //  获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const res = getDetail(id)
        return res.then(detailData => {
            return new SuccessModel(detailData)
        })
    }
    //  新建博客接口
    if (method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = '张三'
        const res = newBlog(req.body)
        return res.then(data => {
            return new SuccessModel(data)
        })
        // const data = newBlog(req.body)
        // return new SuccessModel(data)
    }
    //  更新博客接口
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }
    //  删除博客接口
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const author = '张三'
        const result = deleteBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}


module.exports = handleBlogRouter