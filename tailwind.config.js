module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
      extend: {
        colors: {
          'agent-primary': '#6366f1',
          'agent-secondary': '#4f46e5',
          'agent-accent': '#818cf8',
          'agent-dark': '#1e1b4b',
          'agent-light': '#c7d2fe'
        }
      }
    },
    plugins: [
      require('@tailwindcss/forms')
    ]
  }
  
  // prisma/seed.ts
  import { PrismaClient } from '@prisma/client';
  const prisma = new PrismaClient();
  
  async function main() {
    // Create default agents
    const hyperion = await prisma.agent.create({
      data: {
        type: 'HYPERION-X//9',
        name: 'Hyperion Prime',
        status: 'IDLE',
        parameters: {
          processingPower: 82,
          systemStability: 88,
          executionPrecision: 55,
          resourceCapacity: 85
        },
        specializations: [
          'Parallel Processing',
          'Data Synthesis',
          'Pattern Analysis',
          'Predictive Modeling'
        ]
      }
    });
  
    console.log({ hyperion });
  }
  
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });