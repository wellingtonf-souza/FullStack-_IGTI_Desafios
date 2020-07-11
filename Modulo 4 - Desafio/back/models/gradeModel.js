export default (mongoose) => {
  const schema = mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, required: true },
    value: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) {
          throw new Error("negative value");
        }
      },
    },
    lastModified: { type: Date, default: Date.now },
  });

  const gradeModel = mongoose.model("grades", schema, "grades");

  return gradeModel;
};
