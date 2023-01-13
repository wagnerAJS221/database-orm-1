const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: "Alice",
    },
  });

  console.log("Customer created", createdCustomer);

  // Add your code here
  const createContact = await prisma.contact.create({
    data: {
      customer: {
        connect: {
          id: createdCustomer.id,
        },
      },
      phone: "071245889",
      email: "alice@gmail.com",
    },
  });

  const createMovie = await prisma.movie.create({
    data: {
      title: "Avatar 2",
      runTimeMins: 200,
    },
  });

  const createScreening = await prisma.screening.create({
    data: {
      startAt: "2023-01-13T11:42:42.359Z",
    },
  });

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
