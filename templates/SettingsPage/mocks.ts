export interface SettingsData {
    general: {
        systemName: string;
        environment: 'Production' | 'Staging';
        defaultRegion: string;
        defaultCurrency: string;
        timezone: string;
        dateFormat: string;
    };
    aiConfig: {
        responseMode: 'Conservative' | 'Balanced' | 'Exploratory';
        confidenceThreshold: number;
        reasoningDepth: number;
        knowledgePriority: string[];
        cacheDuration: number;
        enableFallback: boolean;
    };
    clareConfig: {
        tone: 'Professional' | 'Friendly' | 'Technical';
        responseLength: 'Short' | 'Medium' | 'Detailed';
        disclosureLevel: 'High-level only' | 'Partial details' | 'Full';
        defaultFallback: string;
        languageSupport: boolean;
        regionFiltering: boolean;
    };
    integrations: {
        erp: boolean;
        pricing: boolean;
        logistics: boolean;
        compliance: boolean;
    };
    security: {
        loginMethod: 'Password' | 'SSO';
        sessionTimeout: number;
        ipAllowlist: string;
        twoFactor: boolean;
        auditLogging: boolean;
    };
    notifications: {
        kbExpiry: boolean;
        ruleConflict: boolean;
        aiErrors: boolean;
        integrationFailures: boolean;
        deliveryEmail: boolean;
        deliveryDashboard: boolean;
    };
    maintenance: {
        maintenanceMode: boolean;
    };
}

export const mockSettings: SettingsData = {
    general: {
        systemName: 'Zeek',
        environment: 'Production',
        defaultRegion: 'North America',
        defaultCurrency: 'USD',
        timezone: 'UTC',
        dateFormat: 'YYYY-MM-DD',
    },
    aiConfig: {
        responseMode: 'Balanced',
        confidenceThreshold: 85,
        reasoningDepth: 3,
        knowledgePriority: ['Rules', 'Knowledge Base', 'Structured Data'],
        cacheDuration: 24,
        enableFallback: true,
    },
    clareConfig: {
        tone: 'Professional',
        responseLength: 'Medium',
        disclosureLevel: 'Partial details',
        defaultFallback: "I'm sorry, I don't have enough information to answer that right now.",
        languageSupport: true,
        regionFiltering: true,
    },
    integrations: {
        erp: true,
        pricing: true,
        logistics: false,
        compliance: true,
    },
    security: {
        loginMethod: 'Password',
        sessionTimeout: 60,
        ipAllowlist: '192.168.1.1, 10.0.0.0/24',
        twoFactor: true,
        auditLogging: true,
    },
    notifications: {
        kbExpiry: true,
        ruleConflict: true,
        aiErrors: true,
        integrationFailures: true,
        deliveryEmail: true,
        deliveryDashboard: true,
    },
    maintenance: {
        maintenanceMode: false,
    },
};
