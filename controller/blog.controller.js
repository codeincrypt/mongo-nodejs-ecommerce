const { blogs } = require('../services/index');
const { successCode, errorCode } = require('../util/message');

module.exports = {
    addBlog : async (req, res) => {
        const { title, description, authorId } = req.body;
        try {
            // const response = await blogs.createNewBlog(title, description, authorId);
            return res.send({
                statusCode:successCode,
                message: 'New Blog created successfully'
            });
        } catch (error) {
            return res.status(500).send({
                statusCode:errorCode,
                message: error.message
            });
        }
    }
}