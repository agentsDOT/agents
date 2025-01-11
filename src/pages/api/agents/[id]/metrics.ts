export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const core = ProcessingCore.getInstance();

    if (req.method === 'GET') {
        try {
            const agent = await core.getAgent(id as string);
            if (!agent) {
                return res.status(404).json({ error: 'Agent not found' });
            }

            const metrics = await agent.getMetrics();
            res.status(200).json(metrics);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}