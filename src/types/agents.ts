export interface AgentConfig {
    id: string;
    type: AgentType;
    parameters: AgentParameters;
    specializations: string[];
}

export interface AgentParameters {
    processingPower: number;
    systemStability: number;
    executionPrecision: number;
    resourceCapacity: number;
}

export interface AgentMetrics extends AgentParameters {
    latency: number;
    load: number;
    uptime: number;
}

export interface TaskResult {
    status: 'completed' | 'failed';
    result?: any;
    error?: string;
    metrics?: {
        processingTime: number;
        resourceUsage: number;
    };
}