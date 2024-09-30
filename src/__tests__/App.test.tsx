import GatesGrid from '@/components/layout/GatesGrid';
import Nav from '@/components/navigation/Nav';
import { expect, test } from 'vitest'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { starseekerClient } from '@/helpers/starseekerClient';
import { mockGates } from './mocks/handlers';

test('Nav contains correct number of links', () => {
  render(<Nav />);

  expect(screen.getByRole('heading', { level: 1, name: 'Star Seeker' })).toBeInTheDocument();

  const links = screen.getAllByRole('link');

  expect(links).toHaveLength(3);
});

test('Users can view specific gate details', async () => {
  render(<GatesGrid gates={mockGates}/>)

  for (const gate of mockGates) {
    expect(await screen.findByText(gate.name)).toBeInTheDocument();
  }

  const firstGateItem = screen.getAllByRole('listitem')[0];

  if (!firstGateItem) {
    throw new Error('No gate item found');
  }

  const button = within(firstGateItem).getByRole('button');

  fireEvent.click(button);

  const toast = screen.getByRole('alert', { name: 'Toast' });

  await waitFor(() => {
    expect(toast).toHaveClass('translate-y-0');
    expect(toast).toHaveTextContent(mockGates[0].name);
  });
});

test('Client correctly fetches the list of gates', async () => {
  const gates = await starseekerClient.getGatesList();

  expect(gates.type === 'success' && Array.isArray(gates.data)).toBe(true);
})

test('Client correctly fetches a specific gate', async () => {
  const gate = await starseekerClient.getGateByCode('G1');

  expect(gate.type === 'success' && gate.code === 'G1').toBe(true);
})

test('Client correctly fetches a route between two gates', async () => {
  const route = await starseekerClient.getRoute(mockGates[0].code, mockGates[1].code);

  expect(route.type === 'success' && route.route.includes(mockGates[0].code) && route.route.includes(mockGates[1].code)).toBe(true);
})

test('Client correctly fetches transport details', async () => {
  const transport = await starseekerClient.calculateJourneyCost({distance: 100, passengers: 2, parking: 1});

  expect(transport.type === 'success' && transport.journeyCost > 0).toBe(true);
})