export class ProcessingCore {
    private static instance: ProcessingCore;
    private activeAgents: Map<string, IAgent> = new Map();
    private metricsCollector: MetricsCollector;

    private constructor() {
        this.metricsCollector = new MetricsCollector();
    }

    static getInstance(): ProcessingCore {
        if (!ProcessingCore.instance) {
            ProcessingCore.instance = new ProcessingCore();
        }
        return ProcessingCore.instance;
    }

    async deployAgent(agent: IAgent): Promise<void> {
        if (this.activeAgents.has(agent.id)) {
            throw new Error(`Agent ${agent.id} already deployed`);
        }

        await agent.connect();
        this.activeAgents.set(agent.id, agent);
        this.metricsCollector.startCollecting(agent);
    }

    async submitTask(task: ProcessingTask): Promise<TaskResult> {
        const agent = await this.selectOptimalAgent(task);
        if (!agent) {
            throw new Error('No suitable agent available for task');
        }

        return this.executeTask(agent, task);
    }

    private async selectOptimalAgent(task: ProcessingTask): Promise<IAgent | null> {
        const candidates = Array.from(this.activeAgents.values())
            .filter(agent => this.isAgentSuitable(agent, task));

        if (candidates.length === 0) return null;

        return candidates.reduce((best, current) => {
            const bestScore = this.calculateAgentScore(best, task);
            const currentScore = this.calculateAgentScore(current, task);
            return currentScore > bestScore ? current : best;
        });
    }

    private calculateAgentScore(agent: IAgent, task: ProcessingTask): number {
        const metrics = agent.getMetrics();
        const weights = {
            processingPower: 0.3,
            systemStability: 0.2,
            executionPrecision: 0.3,
            resourceCapacity: 0.2
        };

        return (
            metrics.processingPower * weights.processingPower +
            metrics.systemStability * weights.systemStability +
            metrics.executionPrecision * weights.executionPrecision +
            metrics.resourceCapacity * weights.resourceCapacity
        ) * (1 - metrics.load / 100);
    }
};