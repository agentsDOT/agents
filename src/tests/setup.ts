import { prisma } from '../lib/prisma';
import { ProcessingCore } from '../core/ProcessingCore';

beforeAll(async () => {
    // Clear database
    await prisma.metrics.deleteMany();
    await prisma.task.deleteMany();
    await prisma.agent.deleteMany();
    
    // Initialize core systems
    ProcessingCore.getInstance();
});

afterAll(async () => {
    await prisma.$disconnect();
});