export interface UserProfile {
    id: string;
    fullName: string;
    displayName: string;
    email: string;
    role: 'Super Admin' | 'Admin' | 'Editor';
    status: 'Active' | 'Inactive';
    createdDate: string;
    lastLogin: string;
    avatarUrl?: string;
    preferences: {
        theme: 'Light' | 'Dark' | 'System';
        landingPage: string;
        notifications: {
            email: boolean;
            dashboard: boolean;
        };
        language: string;
    };
    security: {
        twoFactorEnabled: boolean;
        sessionTimeout: number; // minutes
    };
    apiToken?: {
        key: string;
        created: string;
        lastUsed: string;
        scope: string[];
    };
}

export interface ActivityLog {
    id: string;
    timestamp: string;
    action: string;
    module: string;
    ipAddress: string;
}

export interface Session {
    id: string;
    device: string;
    location: string;
    lastActive: string;
    current: boolean;
}

export const mockProfile: UserProfile = {
    id: 'u-123456',
    fullName: 'Robert Johnson',
    displayName: 'Rob',
    email: 'robert.johnson@zeek.ai',
    role: 'Super Admin',
    status: 'Active',
    createdDate: '2023-01-15',
    lastLogin: '2024-03-21 09:12 AM',
    avatarUrl: '/images/avatar-1.jpg', // Placeholder
    preferences: {
        theme: 'Light',
        landingPage: '/dashboard',
        notifications: {
            email: true,
            dashboard: true,
        },
        language: 'English (US)',
    },
    security: {
        twoFactorEnabled: true,
        sessionTimeout: 30,
    },
    apiToken: {
        key: 'zk_live_8374...9283',
        created: '2024-01-10',
        lastUsed: '2024-03-20 14:22',
        scope: ['read:all', 'write:settings'],
    }
};

export const mockActivity: ActivityLog[] = [
    { id: 'a1', timestamp: '2024-03-21 09:15', action: 'Updated AI Logic Rule', module: 'AI Rules', ipAddress: '192.168.1.45' },
    { id: 'a2', timestamp: '2024-03-20 16:30', action: 'Uploaded Document', module: 'Knowledge Base', ipAddress: '192.168.1.45' },
    { id: 'a3', timestamp: '2024-03-20 09:00', action: 'System Login', module: 'Auth', ipAddress: '192.168.1.45' },
    { id: 'a4', timestamp: '2024-03-19 14:20', action: 'Changed Password', module: 'Security', ipAddress: '192.168.1.45' },
    { id: 'a5', timestamp: '2024-03-18 11:10', action: 'Modified General Settings', module: 'Settings', ipAddress: '192.168.1.45' },
];

export const mockSessions: Session[] = [
    { id: 's1', device: 'MacBook Pro - Chrome', location: 'San Francisco, US', lastActive: 'Now', current: true },
    { id: 's2', device: 'iPhone 13 - Safari', location: 'San Francisco, US', lastActive: '2 hours ago', current: false },
    { id: 's3', device: 'Windows PC - Firefox', location: 'New York, US', lastActive: '3 days ago', current: false },
];
