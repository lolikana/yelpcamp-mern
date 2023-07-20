import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('should renders the title', () => {
    render(<App />);
    const titleElement = screen.getByTestId(/title/i);
    expect(titleElement.textContent).toBe('HOMEPAGE');
  });
});
