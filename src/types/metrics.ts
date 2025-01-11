export interface SystemMetrics {
    activeAgents: number;
    totalTasks: number;
    systemLoad: number;
    networkStatus: 'healthy' | 'degraded' | 'error';
}

export interface MetricsHistory {
    timestamp: number;
    metrics: AgentMetrics;
}