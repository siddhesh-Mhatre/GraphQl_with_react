import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
 

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
    iquote: async (_, { by }) => await Quote.find({ by }),
    myprofile: async (_, args, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (ur) => await Quote.find({ by: ur._id }),
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {  // CREATE USER
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User allredy exist with tha email");
      }
      const hashedpassword = await bcrypt.hash(userNew.password, 12);

      const newUser = new User({
        ...userNew,
        password: hashedpassword,
      });

      return await newUser.save();
    },
    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });

      if (!user) {
        throw new Error("User doent exists with that email");
      }

      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("email or password invalid");
      }
      const token = Jwt.sign({ userId: user._id },process.env.JWT_SECRET);

      return { token };
    },
    createQuote: async (_, { name }, { userId }) => {
 
      if (!userId) throw new Error("You must be logged in");
      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return "Quote saved successfully";
    },

    deleteQuote: async (_, { QuoteInfo },{userId}) => {
      if (!userId) throw new Error("You must be logged in");
      const QuoteData = await Quote.findOneAndRemove({
        name: QuoteInfo.name,
        by: QuoteInfo.by,
      });

      return QuoteData ? "delete sucessfully" : "allredy deleted";
    },

    editQuote: async (_, { Editequote }) => {
      const QuoteData = await Quote.updateOne(
        { name: Editequote.name, by: Editequote.by },
        { $set: { name: Editequote.UpadtedQuote } }
      );
      return QuoteData ? "Upadte sucessfully" : "upadte fail";
    },
  },
};

export default resolvers;
