import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardAdminUserEndpoint from '../DashboardAdminUserEndpoint';
import DashboardAdminThreatIntelligence from '../DashboardAdminThreatIntelligence';

// Mock Card component
jest.mock('../../../components/Layouts/Card', () => ({
    Card: ({ title, children }) => (
        <div data-testid="card">
            <h3>{title}</h3>
            {children}
        </div>
    )
}));

// Mock hooks
jest.mock('../../../hooks/useUserEndpointData', () => ({
    __esModule: true,
    useUserEndpointData: () => ({
        logons: [],
        compliance: [],
        loading: false,
        error: null
    })
}));

jest.mock('../../../hooks/useThreatIntelData', () => ({
    __esModule: true,
    useThreatIntelData: () => ({
        actors: [],
        assets: [],
        global: [],
        loading: false,
        error: null
    })
}));

jest.mock('../../../hooks/useAgentDetails', () => ({
    __esModule: true,
    useAgentDetails: () => ({
        alerts: [],
        mitre: { tactics: [], techniques: [] },
        loading: false,
        error: null
    })
}));

jest.mock('../../../hooks/useAgentHealth', () => ({
    __esModule: true,
    useAgentHealth: () => ({ agents: [], error: null })
}));

jest.mock('../../../hooks/useAgentList', () => ({
    __esModule: true,
    default: () => []
}));

jest.mock('../../../hooks/useMitreAlerts.js', () => ({
    __esModule: true,
    useMitreAlerts: () => [] // Returns array directly
}));

// Mock rechart components
jest.mock('recharts', () => ({
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    BarChart: () => <div />,
    Bar: () => <div />,
    XAxis: () => <div />,
    YAxis: () => <div />,
    Tooltip: () => <div />,
    Legend: () => <div />,
    PieChart: () => <div />,
    Pie: () => <div />,
    Cell: () => <div />,
    LineChart: () => <div />,
    Line: () => <div />
}));

describe('Map Components Robustness', () => {
    let originalL;

    beforeEach(() => {
        originalL = window.L;
        delete window.L;
        jest.useFakeTimers();
    });

    afterEach(() => {
        window.L = originalL;
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    test('DashboardAdminUserEndpoint shows loading state when Leaflet is missing', () => {
        render(<DashboardAdminUserEndpoint />);
        // Fixed: Test now matches the updated "Loading Map Infrastructure..." text
        expect(screen.getByText(/Loading Map Infrastructure.../i)).toBeInTheDocument();
    });

    test('DashboardAdminUserEndpoint initializes map when window.L becomes available', () => {
        const mockMap = {
            setView: jest.fn().mockReturnThis(),
            remove: jest.fn()
        };
        const mockL = {
            map: jest.fn().mockReturnValue(mockMap),
            tileLayer: jest.fn().mockReturnValue({ addTo: jest.fn() }),
            circle: jest.fn().mockReturnValue({ addTo: jest.fn() }),
            circleMarker: jest.fn().mockReturnValue({
                addTo: jest.fn().mockReturnValue({ bindTooltip: jest.fn() })
            })
        };

        render(<DashboardAdminUserEndpoint />);

        act(() => {
            window.L = mockL;
            jest.advanceTimersByTime(1000);
        });

        expect(mockL.map).toHaveBeenCalled();
        expect(screen.queryByText(/Loading Map Infrastructure.../i)).not.toBeInTheDocument();
    });

    test('DashboardAdminThreatIntelligence shows error after multiple failed attempts', () => {
        render(<DashboardAdminThreatIntelligence />);

        act(() => {
            jest.advanceTimersByTime(11000); // 10 attempts * 1s
        });

        expect(screen.getByText(/Leaflet JS failed to load after multiple attempts/i)).toBeInTheDocument();
    });

    test('DashboardAdminThreatIntelligence handles initialization error gracefully', () => {
        const mockL = {
            map: () => { throw new Error("Mock Map Initialization Failed"); }
        };

        render(<DashboardAdminThreatIntelligence />);

        act(() => {
            window.L = mockL;
            jest.advanceTimersByTime(1000);
        });

        expect(screen.getByText(/Map Init Error: Mock Map Initialization Failed/i)).toBeInTheDocument();
    });
});
