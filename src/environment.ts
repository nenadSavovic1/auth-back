import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || "3000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  REQUIRE_ROLES: process.env.REQUIRE_ROLES === "true",
  NODE_ENV: process.env.NODE_ENV || "development",
};
