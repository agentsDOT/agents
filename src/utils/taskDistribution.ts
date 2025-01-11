export class TaskDistributor {
    static distributeTask(task: ProcessingTask, agents: IAgent[]): IAgent {
        const eligibleAgents = agents.filter(agent => 
            this.isAgentEligible(agent, task)
        );

        if (eligibleAgents.length === 0) {
            throw new TaskError(
                'No eligible agents available for task',
                task.id,
                'TASK_DISTRIBUTION',
                'NO_ELIGIBLE_AGENTS'
            );
        }

        return this.selectOptimalAgent(eligibleAgents, task);
    }

    private static isAgentEligible(agent: IAgent, task: ProcessingTask): boolean {
        const metrics = agent.getMetrics();
        return (
            agent.specializations.includes(task.type) &&
            metrics.load < 80 &&
            metrics.systemStability >= 60
        );
    }

    private static selectOptimalAgent(agents: IAgent[], task: ProcessingTask): IAgent {
        return agents.reduce((best, current) => {
            const bestScore = this.calculateAgentScore(best, task);
            const currentScore = this.calculateAgentScore(current, task);
            return currentScore > bestScore ? current : best;
        });
    }

    private static calculateAgentScore(agent: IAgent, task: ProcessingTask): number {
        const metrics = agent.getMetrics();
        const baseScore = MetricsCalculator.calculateEfficiency(metrics);
        const loadPenalty = metrics.load / 100;
        
        return baseScore * (1 - loadPenalty);
    }
}