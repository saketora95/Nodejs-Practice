module.exports = {
    apps : [
      {
        name   : "Topic 10",
        script : "./dist/main.js",
        instances : 4,
        exec_mode : "cluster",
        env: {
          "PORT": 4000,
          
          "MQTT_URL": "mosquitto",
          "MQTT_PORT": 1883,
          "MQTT_USERNAME": "tora",
          "MQTT_PASSWORD": "1234",
          "MQTT_TOPIC": "msgTest",
          

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