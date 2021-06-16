
const {
    getUserInfoById,
} = require("../sql");


module.exports = () => {
    const getUserInfo = {
        path: "/user",
        method: 'GET',
        handle: async (ctx) => {
            let id = ctx.userId;
            let [data] = await getUserInfoById(id);
            ctx.body = data;
        }
    }
    return [getUserInfo]
}