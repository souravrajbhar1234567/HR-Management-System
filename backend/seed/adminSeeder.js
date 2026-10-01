import dotenv from "dotenv";
import User from "../models/User.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    // 1. Seed or update Admin
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@peoplehub.com").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const adminName = process.env.ADMIN_NAME || "System Administrator";

    let admin = await User.findOne({
      $or: [{ email: adminEmail }, { role: "admin" }],
    });

    if (admin) {
      console.log(`Found existing admin account (${admin.email}). Updating credentials...`);
      admin.name = adminName;
      admin.email = adminEmail;
      admin.role = "admin";
      admin.isActive = true;
      admin.password = adminPassword;
      await admin.save();
      console.log("✅ Admin credentials successfully updated.");
    } else {
      console.log("Creating new admin user...");
      await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: "admin",
        isActive: true,
      });
      console.log("✅ Admin account created successfully.");
    }

    // 2. Seed or update Demo Employee
    const employeeEmail = "employee@peoplehub.com";
    const employeePassword = "employee123";
    const employeeName = "Sarah Connor";

    let employee = await User.findOne({ email: employeeEmail });

    if (employee) {
      console.log(`Found existing employee account (${employee.email}). Updating credentials...`);
      employee.name = employeeName;
      employee.role = "employee";
      employee.employeeId = "EMP-1001";
      employee.department = "Engineering";
      employee.designation = "Senior Frontend Engineer";
      employee.salary = 7800;
      employee.isActive = true;
      employee.password = employeePassword;
      await employee.save();
      console.log("✅ Employee credentials successfully updated.");
    } else {
      console.log("Creating new demo employee user...");
      await User.create({
        name: employeeName,
        email: employeeEmail,
        password: employeePassword,
        role: "employee",
        employeeId: "EMP-1001",
        department: "Engineering",
        designation: "Senior Frontend Engineer",
        salary: 7800,
        isActive: true,
      });
      console.log("✅ Employee account created successfully.");
    }

    console.log("\n==========================================");
    console.log("🔑 PeopleHub Login Credentials:");
    console.log("------------------------------------------");
    console.log("👑 ADMINISTRATOR:");
    console.log(`   Email:    ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log("------------------------------------------");
    console.log("👤 DEMO EMPLOYEE:");
    console.log(`   Email:    ${employeeEmail}`);
    console.log(`   Password: ${employeePassword}`);
    console.log("==========================================\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedUsers();