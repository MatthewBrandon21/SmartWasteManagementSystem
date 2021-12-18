module.exports = (mongoose) => {
  const userschema = new mongoose.Schema(
    {
      user_email: { type: String, required: true },
      user_username: { type: String, required: true },
      user_nama: { type: String, required: true },
      user_address: { type: String, required: true },
      user_phonenum: { type: Number, required: true },
      user_pwd: { type: String, required: true },
      user_isactive: { type: Boolean, default: false },
      user_isAdmin: { type: Boolean, default: false },
    },
    {
      versionKey: false,
    }
  );

  userschema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const user = mongoose.model("users", userschema);
  return user;
};
