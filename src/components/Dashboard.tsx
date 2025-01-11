import React, { useState, useEffect } from 'react';
import { AgentCard } from './AgentCard';
import { MetricsPanel } from './MetricsPanel';
import { SystemMonitor } from './SystemMonitor';
import { useAgentStore } from '../stores/agentStore';

export const Dashboard: React.FC = () => {
    const { agents, fetchAgents } = useAgentStore();
    const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

    useEffect(() => {
        fetchAgents();
        const interval = setInterval(fetchAgents, 5000);
        return () => clearInterval(interval);
    }, [fetchAgents]);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-gray-800 p-4">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold">Agents Platform</h1>
                </div>
            </header>

            <main className="container mx-auto p-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 lg:col-span-3">
                        <SystemMonitor />
                    </div>

                    <div className="col-span-12 lg:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {agents.map(agent => (
                                <AgentCard
                                    key={agent.id}
                                    agent={agent}
                                    isSelected={selectedAgent === agent.id}
                                    onSelect={() => setSelectedAgent(agent.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {selectedAgent && (
                        <div className="col-span-12">
                            <MetricsPanel agentId={selectedAgent} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};