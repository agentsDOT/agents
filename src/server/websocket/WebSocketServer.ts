import { WebSocket, WebSocketServer } from 'ws';
import { AgentMetrics } from '../../types/agents';

export class MetricsWebSocketServer {
    private wss: WebSocketServer;
    private clients: Map<string, Set<WebSocket>> = new Map();

    constructor(server: any) {
        this.wss = new WebSocketServer({ server });
        this.setupWebSocketServer();
    }

    private setupWebSocketServer(): void {
        this.wss.on('connection', (ws, req) => {
            const agentId = this.getAgentIdFromUrl(req.url);
            if (!agentId) {
                ws.close();
                return;
            }

            this.addClient(agentId, ws);

            ws.on('close', () => {
                this.removeClient(agentId, ws);
            });
        });
    }

    private getAgentIdFromUrl(url: string | undefined): string | null {
        if (!url) return null;
        const match = url.match(/\/agents\/([^\/]+)\/metrics/);
        return match ? match[1] : null;
    }

    private addClient(agentId: string, ws: WebSocket): void {
        if (!this.clients.has(agentId)) {
            this.clients.set(agentId, new Set());
        }
        this.clients.get(agentId)!.add(ws);
    }

    private removeClient(agentId: string, ws: WebSocket): void {
        const agentClients = this.clients.get(agentId);
        if (agentClients) {
            agentClients.delete(ws);
            if (agentClients.size === 0) {
                this.clients.delete(agentId);
            }
        }
    }

    broadcastMetrics(agentId: string, metrics: AgentMetrics): void {
        const clients = this.clients.get(agentId);
        if (!clients) return;

        const data = JSON.stringify(metrics);
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    }
}