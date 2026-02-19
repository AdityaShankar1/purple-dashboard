import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardAdminAI from '../DashboardAdminAI';

// Mock the useIncidentsData hook
jest.mock('../../../hooks/useIncidentsData', () => ({
    useIncidentsData: () => []
}));

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock scrollIntoView as it's not implemented in JSDOM
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('DashboardAdminAI Component', () => {
    let aiResponse = { ok: true, json: async () => ({ summary: 'Default summary', isMock: false }) };

    beforeEach(() => {
        mockFetch.mockClear();
        aiResponse = { ok: true, json: async () => ({ summary: 'Default summary', isMock: false }) };

        mockFetch.mockImplementation((url) => {
            if (url.includes('/wazuh/logs')) {
                return Promise.resolve({ ok: true, json: async () => ([]) });
            }
            if (url.includes('/wazuh/metrics')) {
                return Promise.resolve({ ok: true, json: async () => ({ count: 0, alerts: [] }) });
            }
            if (url.includes('/ai/summarize-dashboard')) {
                return Promise.resolve(aiResponse);
            }
            return Promise.resolve({ ok: true, json: async () => ({}) });
        });
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('renders Security Assistant title and input', () => {
        render(<DashboardAdminAI />);
        expect(screen.getByText(/Security Assistant/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Ask me anything about your logs.../i)).toBeInTheDocument();
    });

    test('renders "Summarize" button and triggers fetch', async () => {
        aiResponse = {
            ok: true,
            json: async () => ({ summary: 'This is a summary', isMock: false })
        };

        render(<DashboardAdminAI />);
        const summarizeBtn = screen.getByText(/Summarize/i);
        expect(summarizeBtn).toBeInTheDocument();

        fireEvent.click(summarizeBtn);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/ai/summarize-dashboard'),
                expect.objectContaining({
                    method: 'POST',
                    body: expect.stringContaining('Summarize the current security status and dashboard metrics.')
                })
            );
        });

        expect(await screen.findByText('This is a summary')).toBeInTheDocument();
    });

    test('handles API error gracefully', async () => {
        aiResponse = {
            ok: false,
            status: 500,
            json: async () => ({ error: 'Ollama failed' })
        };

        render(<DashboardAdminAI />);
        const summarizeBtn = screen.getByText(/Summarize/i);
        fireEvent.click(summarizeBtn);

        await waitFor(() => {
            expect(screen.getByText(/Error: Ollama failed/i)).toBeInTheDocument();
        });
    });

    test('clears chat history', () => {
        window.confirm = jest.fn(() => true);
        localStorage.setItem('ai_chat_history', JSON.stringify([{ id: 1, role: 'user', content: 'hello' }]));

        render(<DashboardAdminAI />);
        const clearBtn = screen.getByTitle(/Clear History/i);
        fireEvent.click(clearBtn);

        expect(window.confirm).toHaveBeenCalled();
        expect(localStorage.getItem('ai_chat_history')).toBe("[]");
    });
});
