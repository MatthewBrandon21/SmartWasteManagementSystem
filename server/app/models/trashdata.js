module.exports = (mongoose) => {
  const trashdatacurrschema = new mongoose.Schema(
    {
      tempat_sampah_gpslocation: {
        lon: Number,
        lat: Number,
      },
      tempat_sampah_currentcapacity: Number,
      tempat_sampah_currentlevel: Number,
    },
    { _id: false }
  );

  const trashdataschema = new mongoose.Schema(
    {
      tempat_sampah_jenis: { type: String, required: true },
      tempat_sampah_name: { type: String, required: true },
      tempat_sampah_location: { type: String, required: true },
      tempat_sampah_region: { type: String, required: true },
      tempat_sampah_maxcapacity: { type: Number, required: true },
      tempat_sampah_totalcapacitythismonth: { type: Number, required: true },
      tempat_sampah_current: trashdatacurrschema,
      tempat_sampah_isfull: { type: Boolean, required: true },
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
