import { AgentFactory } from '../../core/AgentFactory';
import { ProcessingCore } from '../../core/ProcessingCore';

describe('System Integration', () => {
    let factory: AgentFactory;
    let core: ProcessingCore;

    beforeAll(() => {
        factory = AgentFactory.getInstance();
        core = ProcessingCore.getInstance();
    });

    test('should create and deploy agent', async () => {
        const agent = await factory.createAgent({
            id: 'test-agent',
            type: 'HYPERION-X//9',
            parameters: {
                processingPower: 80,
                systemStability: 85,
                executionPrecision: 90,
                resourceCapacity: 75
            },
            specializations: ["Parallel Processing"]
        });

        await core.deployAgent(agent);
        
        const deployedAgent = await core.getAgent(agent.id);
        expect(deployedAgent).toBeDefined();
        expect(deployedAgent?.getMetrics()).toBeDefined();
    });
});