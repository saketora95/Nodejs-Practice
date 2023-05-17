module.exports = {
  apps : [
    {
      name   : "Topic3-0",
      script : "./dist/main.js",
      instances : 4,
      exec_mode : "cluster",
    },
    {
      name   : "Topic3-1",
      script : "./dist/app1/main.js",
    },
    {
      name   : "Topic3-2",
      script : "./dist/app2/main.js",
    },
    {
      name   : "Topic3-3",
      script : "./dist/app3/main.js",
    },
  ]
}
