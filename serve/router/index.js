const Router = require("@koa/router");
const authRoutes = require("./auth")
const contactsRoutes = require("./contacts")
const roomRoutes = require("./room")
const userRoutes = require("./user")
module.exports = function (ios) {
  const router = new Router();
  let routes = [...authRoutes(ios), ...contactsRoutes(ios), ...roomRoutes(ios), ...userRoutes(ios)]
  routes.forEach((item) => {
    switch (item.method) {
      case 'GET':
        router.get(item.path, item.handle)
        break;
      case 'POST':
        router.post(item.path, item.handle)
        break;
      case 'PUT':
        router.put(item.path, item.handle)
        break;
      case 'DELETE':
        router.delete(item.path, item.handle)
        break;
      default:
        return
    }
  })
  return router
};
