import bcrypt from "bcrypt";
import { PrismaClient, Role, Permission } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const username = "admin";
  const password = "Admin@123"; // Change this

  const exists = await prisma.adminUser.findUnique({
    where: {
      username,
    },
  });

  if (exists) {
    console.log("Super Admin already exists.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.create({
    data: {
      name: "Super Admin",
      username,
      passwordHash,

      role: Role.SUPER_ADMIN,

      permissions: Object.values(Permission),

      isActive: true,
    },
  });

  console.log("==================================");
  console.log("Super Admin Created Successfully");
  console.log("Username:", username);
  console.log("Password:", password);
  console.log("==================================");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });