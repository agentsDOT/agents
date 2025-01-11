export class MetricsPublisher {
    private static instance: MetricsPublisher;
    private wsServer: MetricsWebSocketServer;

    private constructor(server: any) {
        this.wsServer = new MetricsWebSocketServer(server);
    }

    static initialize(server: any): void {
        if (!MetricsPublisher.instance) {
            MetricsPublisher.instance = new MetricsPublisher(server);
        }
    }

    static getInstance(): MetricsPublisher {
        if (!MetricsPublisher.instance) {
            throw new Error('MetricsPublisher not initialized');
        }
        return MetricsPublisher.instance;
    }

    publishMetrics(agentId: string, metrics: AgentMetrics): void {
        this.wsServer.broadcastMetrics(agentId, metrics);
    }
}