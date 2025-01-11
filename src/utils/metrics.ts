export class MetricsCalculator {
    static calculateEfficiency(metrics: AgentMetrics): number {
        const weights = {
            processingPower: 0.3,
            systemStability: 0.2,
            executionPrecision: 0.3,
            resourceCapacity: 0.2
        };

        return Object.entries(weights).reduce((total, [key, weight]) => {
            return total + (metrics[key as keyof AgentMetrics] * weight);
        }, 0);
    }

    static calculateHealth(metrics: AgentMetrics): 'healthy' | 'degraded' | 'critical' {
        const efficiency = this.calculateEfficiency(metrics);
        
        if (efficiency >= 80) return 'healthy';
        if (efficiency >= 60) return 'degraded';
        return 'critical';
    }

    static calculateLoadBalance(agents: IAgent[]): number {
        const loads = agents.map(agent => agent.getMetrics().load);
        const avgLoad = loads.reduce((sum, load) => sum + load, 0) / loads.length;
        
        return loads.reduce((variance, load) => {
            return variance + Math.pow(load - avgLoad, 2);
        }, 0) / loads.length;
    }
}