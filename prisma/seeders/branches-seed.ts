import { PrismaClient } from "@prisma/client";
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

export async function branchesSeed() {
    const branchesPath = path.resolve(__dirname, 'data', 'branches.json');
    const branchesRaw = fs.readFileSync(branchesPath, 'utf-8');
    const branches = JSON.parse(branchesRaw).data;

    for ( const branch of branches) {
        const exitingBranch = await prisma.branch.findFirst({
            where: { name: branch.name },
        });
        if (!exitingBranch) {
            await prisma.branch.create({
                data: {
                    name: branch.name,
                    address: branch.address,
                    phoneNumber: branch.phoneNumber,
                },
            });
            console.log(`✅ Branch ${branch.name} created`);
        } else {
            console.log(`⚠️  Branch ${branch.name} already exists. Skipping.`);
        }
        console.log(`✅ Branch ${branch.name} seeded`);
    }


}

if (require.main === module) {
    branchesSeed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
}
