import User from "../models/user.model.js";

export const seedUsers = async (req, res) => {
  try {
    await User.deleteMany();

    const users = await User.insertMany([
      {
        fullName: "Alice Nguyễn",
        email: "alice@example.com",
        password: "12345678",
        avatar: "https://i.pravatar.cc/150?u=alice",
      },
      {
        fullName: "Bob Trần",
        email: "bob@example.com",
        password: "12345678",
        avatar: "https://i.pravatar.cc/150?u=bob",
      },
      {
        fullName: "Charlie Lê",
        email: "charlie@example.com",
        password: "12345678",
        avatar: "https://i.pravatar.cc/150?u=charlie",
        role: "admin",
      },
    ]);

    res.status(201).json({
      message: "Seed thành công người dùng!",
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi seed user", error: err.message });
  }
};
