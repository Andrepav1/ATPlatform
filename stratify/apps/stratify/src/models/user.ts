import db from "../db";

export const userSchema = new db.Schema({
  api_key: String,
  primary_account: String,
  email: String
});

export const User = db.model("User", userSchema);
