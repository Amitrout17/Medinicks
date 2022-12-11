const stripe = require("stripe")(process.env.STRIP_API_SECRET);

exports.processPayment = async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });

    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    res.json({
      sucess: false,
      error,
      error_message: "payment error",
    });
  }
};


//send strip api key
exports.sendStripeApiKey = async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  };
  