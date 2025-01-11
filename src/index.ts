import { createServer } from 'http';
import { app } from './server/api';
import { MetricsPublisher } from './server/websocket/MetricsPublisher';
import { ProcessingCore } from './core/ProcessingCore';
import { logger } from './utils/logger';

const port = process.env.PORT || 3000;
const server = createServer(app);

// Initialize WebSocket server
MetricsPublisher.initialize(server);

// Initialize core systems
ProcessingCore.getInstance();

server.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
