import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardAdminMetrics from '../DashboardAdminMetrics';

// Mock Card component
jest.mock('../../../components/Layouts/Card', () => ({
    Card: ({ title, children, className }) => (
        <div data-testid="card" className={className}>
            <h3>{title}</h3>
            {children}
        </div>
    )
}));

// Mock hooks
jest.mock('../../../hooks/useWazuhSocket', () => ({
    useWazuhSocket: () => ({
        alerts: [],
        totalCount: 1234
    })
}));

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ count: 5678, alerts: [], tags: [], data: [] }),
    })
);

// Mock rechart components
jest.mock('recharts', () => ({
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    PieChart: () => <div />,
    Pie: () => <div />,
    Cell: () => <div />,
    LineChart: () => <div />,
    Line: () => <div />,
    Tooltip: () => <div />,
    XAxis: () => <div />,
    YAxis: () => <div />
}));

describe('DashboardAdminMetrics UI Enhancements', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders Total Alerts with dropdown', () => {
        render(<DashboardAdminMetrics />);
        expect(screen.getByText(/Total Alerts/i)).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByDisplayValue('All Time')).toBeInTheDocument();
    });

    test('replaces Open Alerts with Last 24Hr Alerts', () => {
        render(<DashboardAdminMetrics />);
        expect(screen.getByText(/Last 24Hr Alerts/i)).toBeInTheDocument();
        expect(screen.queryByText(/Open Alerts \(Live Stream\)/i)).not.toBeInTheDocument();
    });

    test('does not render Train & Test chart', () => {
        render(<DashboardAdminMetrics />);
        expect(screen.queryByText(/Train & Test/i)).not.toBeInTheDocument();
    });

    test('dropdown changes timeRange and triggers fetch', async () => {
        render(<DashboardAdminMetrics />);
        const select = screen.getByRole('combobox');
        
        fireEvent.change(select, { target: { value: '7d' } });
        expect(screen.getByText(/Past 7d/i)).toBeInTheDocument();
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/alerts/count?timeRange=7d'));
    });
});
