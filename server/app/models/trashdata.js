const { nanoid } = require("nanoid");

module.exports = (mongoose) => {
  const trashdatacurrschema = new mongoose.Schema(
    {
      tempat_sampah_gpslocation: {
        lon: { type: Number, default: 0 },
        lat: { type: Number, default: 0 },
      },
      tempat_sampah_currentcapacity: { type: Number, default: 0 },
      tempat_sampah_currentlevel: { type: Number, default: 0 },
    },
    { _id: false }
  );

  const trashdataschema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => nanoid(2)
      },
      tempat_sampah_jenis: { type: String, required: true },
      tempat_sampah_name: { type: String, required: true },
      tempat_sampah_location: { type: String, required: true },
      tempat_sampah_region: { type: String, required: true },
      tempat_sampah_maxcapacity: { type: Number, required: true },
      tempat_sampah_totalcapacitythismonth: {
        type: Number,
        required: true,
        default: 0,
      },
      tempat_sampah_current: trashdatacurrschema,
      tempat_sampah_isfull: { type: Boolean, required: true, default: false },
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    },
    { versionKey: false }
  );

  trashdataschema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const trashdata = mongoose.model("trashdatas", trashdataschema);
  return trashdata;
};
