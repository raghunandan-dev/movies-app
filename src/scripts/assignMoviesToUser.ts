import mongoose from "mongoose";
import dbConnect from "../utils/db";
import User from "../app/models/User";
import Movie from "../app/models/Movie";

async function assignMovies() {
  await dbConnect();

  // 1️⃣ Get any existing user
  const user = await User.findOne();
  if (!user) {
    console.log("No users found in DB. Create a user first.");
    process.exit(1);
  }

  console.log("Assigning movies to user:", user.username);

  // 2️⃣ Update all movies that don’t have a userId yet
  const result = await Movie.updateMany(
    { userId: { $exists: false } }, // or { userId: null }
    { $set: { userId: user._id } }
  );

  console.log(`Updated ${result.modifiedCount} movies with userId ${user._id}`);

  mongoose.connection.close();
}

assignMovies().catch(console.error);
