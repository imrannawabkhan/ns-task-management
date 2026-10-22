module.exports = {
  apps: [
    {
      name: 'main',
      script: './dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        // Fall back to defaults if not provided by the environment
        NODE_ENV: 'production',
        STAGE: process.env.STAGE || 'prod',
        APP_PORT: process.env.APP_PORT || 3000,

        // Pass your database variables through so ConfigService can read them
        DB_TYPE: process.env.DB_TYPE,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_DATABASE: process.env.DB_DATABASE,
      },
    },
  ],
};
