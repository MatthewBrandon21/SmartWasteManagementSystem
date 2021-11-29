module.exports = (mongoose) => {
//   const trashdatacurrschema = new mongoose.Schema(
//     {
//       tempat_sampah_gpslocation: {
//         lon: Number,
//         lat: Number,
//       },
//       tempat_sampah_currentcapacity: Number,
//       tempat_sampah_currentlevel: Number,
//     }
//   );

  const trashdataschema = new mongoose.Schema({
    tempat_sampah_jenis: String,
    tempat_sampah_name: String,
    tempat_sampah_location: String,
    tempat_sampah_region: String,
    tempat_sampah_maxcapacity: Number,
    tempat_sampah_totalcapacitythismonth: Number,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    // tempat_sampah_current: trashdatacurrschema,
    tempat_sampah_isfull: Boolean,
  });

  trashdataschema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const trashdata = mongoose.model("trashdatas", trashdataschema);
  return trashdata;
};
