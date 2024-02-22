export default {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_PORT: process.env.EMAIL_PORT,
};
