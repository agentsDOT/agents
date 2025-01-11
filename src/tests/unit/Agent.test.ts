import { HyperionAgent } from '../../agents/implementations/HyperionAgent';

describe('HyperionAgent', () => {
    let agent: HyperionAgent;

    beforeEach(() => {
        agent = new HyperionAgent({
            id: 'test-hyperion',
            type: 'HYPERION-X//9',
            parameters: {
                processingPower: 82,
                systemStability: 88,
                executionPrecision: 55,
                resourceCapacity: 85
            },
            specializations: [
                "Parallel Processing",
                "Data Synthesis",
                "Pattern Analysis",
                "Predictive Modeling"
            ]
        });
    });

    test('should initialize with correct parameters', () => {
        const metrics = agent.getMetrics();
        expect(metrics.processingPower).toBe(82);
        expect(metrics.systemStability).toBe(88);
        expect(metrics.executionPrecision).toBe(55);
        expect(metrics.resourceCapacity).toBe(85);
    });

    test('should handle parallel processing tasks', async () => {
        const result = await agent.process({
            id: 'test-task',
            type: 'parallel-processing',
            data: [1, 2, 3, 4, 5]
        });

        expect(result.status).toBe('completed');
        expect(result.metrics).toBeDefined();
    });
});