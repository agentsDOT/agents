export const AgentCard: React.FC<AgentCardProps> = ({ agent, isSelected, onSelect }) => {
    return (
        <div className={`bg-gray-800 rounded-lg p-4 border-2 ${
            isSelected ? 'border-blue-500' : 'border-transparent'
        }`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{agent.name}</h3>
                <span className="px-2 py-1 rounded bg-gray-700 text-sm">
                    {agent.type}
                </span>
            </div>

            <div className="space-y-4">
                <MetricBar
                    label="Processing Power"
                    value={agent.metrics.processingPower}
                    color="blue"
                />
                <MetricBar
                    label="System Stability"
                    value={agent.metrics.systemStability}
                    color="green"
                />
                <MetricBar
                    label="Execution Precision"
                    value={agent.metrics.executionPrecision}
                    color="purple"
                />
                <MetricBar
                    label="Resource Capacity"
                    value={agent.metrics.resourceCapacity}
                    color="orange"
                />
            </div>

            <button
                onClick={onSelect}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
                Connect to Agent
            </button>
        </div>
    );
};