export class ConfigValidator {
    static validateParameters(parameters: AgentParameters): void {
        const totalPoints = Object.values(parameters).reduce((sum, value) => sum + value, 0);
        
        if (totalPoints > 390) {
            throw new AgentError(
                `Total parameter points (${totalPoints}) exceeds maximum of 390`,
                'CONFIG_VALIDATION',
                'PARAMETER_LIMIT_EXCEEDED',
                'high'
            );
        }

        for (const [key, value] of Object.entries(parameters)) {
            if (value < 0 || value > 100) {
                throw new AgentError(
                    `Parameter ${key} must be between 0 and 100`,
                    'CONFIG_VALIDATION',
                    'INVALID_PARAMETER_VALUE',
                    'high'
                );
            }
        }
    }

    static validateSpecializations(specializations: string[]): void {
        if (!specializations.length) {
            throw new AgentError(
                'Agent must have at least one specialization',
                'CONFIG_VALIDATION',
                'NO_SPECIALIZATIONS',
                'medium'
            );
        }
    }
}