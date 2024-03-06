const { blogs } = require(".")


module.exports = {
    createNewBlog : async(items) => {
        try {
            console.log("items : ", items);
            blogs.insertOne(items)
        } catch (error) {
            console.error('Error inserting blogs.insertOne : ', error);
            throw error;
        }
    },

    updateBlog : async() => {
        try {
            
        } catch (error) {
            
        }
    }
}