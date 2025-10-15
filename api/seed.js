const { PrismaClient } = require('@prisma/client');
   const prisma = new PrismaClient();

   async function seed() {
  try {
    // Inserir professores sem duplicação
    const professorsData = [
      { email: "prof1@example.com", senha: "senha1", nome: "Prof A" },
      { email: "prof2@example.com", senha: "senha2", nome: "Prof B" },
      { email: "prof3@example.com", senha: "senha3", nome: "Prof C" },
    ];

    for (const professor of professorsData) {
      const existingProfessor = await prisma.professor.findUnique({
        where: { email: professor.email },
      });

      if (!existingProfessor) {
        await prisma.professor.create({
          data: professor,
        });
        console.log(`Professor ${professor.nome} inserido.`);
      } else {
        console.log(`Professor com email ${professor.email} já existe.`);
      }
    }

  } catch (error) {
    console.error("Erro ao inserir dados de teste:", error);
  }
}

seed();
