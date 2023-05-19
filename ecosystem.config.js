module.exports = {
    apps : [
      {
        name   : "Topic 5",
        script : "./dist/main.js",
        instances : 4,
        exec_mode : "cluster",
        env: {
          "PORT": 4000,
        }
      },
      // {
      //   name   : "Topic3-1",
      //   script : "./dist/main.js",
      //   env: {
      //     "PORT": 4001,
      //   }
      // },
      // {
      //   name   : "Topic3-2",
      //   script : "./dist/main.js",
      //   env: {
      //     "PORT": 4002,
      //   }
      // },
      // {
      //   name   : "Topic3-3",
      //   script : "./dist/main.js",
      //   env: {
      //     "PORT": 4003,
      //   }
      // },
    ]
  }