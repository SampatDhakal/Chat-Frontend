import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('Sidebar component', () => {
    it('renders available rooms and members', () => {
        render(<Sidebar />);

        expect(screen.getByText('Available rooms')).toBeInTheDocument();
        expect(screen.getByText('Members')).toBeInTheDocument();
    });

    it('displays list of rooms and members', () => {
        render(<Sidebar />);

        const rooms = screen.getAllByRole('listitem');
        expect(rooms.length).toBeGreaterThan(0);

        const members = screen.getAllByRole('listitem');
        expect(members.length).toBeGreaterThan(0);
    });

});

