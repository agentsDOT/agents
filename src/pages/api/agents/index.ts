import { NextApiRequest, NextApiResponse } from 'next';
import { AgentFactory } from '../../../core/AgentFactory';
import { ProcessingCore } from '../../../core/ProcessingCore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const factory = AgentFactory.getInstance();
    const core = ProcessingCore.getInstance();

    switch (req.method) {
        case 'GET':
            try {
                const agents = await core.getActiveAgents();
                res.status(200).json(agents);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        case 'POST':
            try {
                const agent = await factory.createAgent(req.body);
                await core.deployAgent(agent);
                res.status(201).json(agent);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}