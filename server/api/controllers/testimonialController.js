const Testimonial = require("../models/testimonials");
const cloudinary = require("../../utils/cloudinary");

// Define Joi schema
const testimonialSchema = Joi.object({
  company_name: Joi.string().required(),
  reviewer_name: Joi.string().allow(null, ""), // Allows empty strings or null values
  review: Joi.string().required(),
  pictures: Joi.array().items(Joi.string().uri()).required(), // Assuming pictures are an array of URLs
});

exports.createTestimonial = async (req, res) => {
  // Validate request data against the schema
  const { error } = testimonialSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "Validation Error", error: error.details[0].message });
  }
  try {
    const { company_name, reviewer_name, review, pictures } = req.body;
    const creation = await Testimonial.create({
      company_name,
      reviewer_name,
      review,
      pictures: [],
    });
    // Generate a unique folder name using the product ID
    const folderName = `${process.env.CLOUDINARY_DB}/product_${creation.testimonial_id}`;

    // Upload pictures to Cloudinary
    const uploadPromises = pictures?.map((base64Data) => {
      return cloudinary.uploader.upload(base64Data, {
        folder: folderName, // Specify the folder for uploaded images
      });
    });

    const uploadedImages = await Promise.all(uploadPromises);

    // Update the product with the uploaded images
    await creation.update({ pictures: uploadedImages });
    res.status(200).json({ message: "Created Testimonial Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to Create Testimonial", error: error.message });
  }
};
exports.deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    await testimonial.destroy();
    res.status(200).json({ message: "Testimonial Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to Delete Testimonial", error: error.message });
  }
};
