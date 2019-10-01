module.exports = {
  apps: [
    {
      name: "api",
      script: "build/index.js",
      args: " --max-old-space-size=8192",
      watch: ["build"],
      env: {
        COMMON_VARIABLE: "true",
      },
      env_production: {
        NODE_ENV: "production",
      },
      output: "./logs/out.log",
      error: "./logs/error.log",
      log: "./logs/combined.outerr.log",
    },
  ]
};
