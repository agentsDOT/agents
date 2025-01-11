import { AgentConfig, AgentMetrics, AgentParameters, TaskResult } from '../types/agents';
import { ProcessingTask } from '../types/tasks';

export abstract class BaseAgent {
    protected id: string;
    protected metrics: AgentMetrics;
    protected specializations: string[];

    constructor(config: AgentConfig) {
        this.id = config.id;
        this.specializations = config.specializations;
        this.initializeMetrics(config.parameters);
    }

    protected initializeMetrics(parameters: AgentParameters): void {
        this.metrics = {
            ...parameters,
            latency: 0,
            load: 0,
            uptime: 0
        };
    }

    getMetrics(): AgentMetrics {
        return this.metrics;
    }

    abstract process(task: ProcessingTask): Promise<TaskResult>;
}