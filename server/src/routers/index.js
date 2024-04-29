const initRouters = (app) => {
  return app.use("/", (req, res) => {
    res.send("server on day ne!");
  });
};

export default initRouters;
