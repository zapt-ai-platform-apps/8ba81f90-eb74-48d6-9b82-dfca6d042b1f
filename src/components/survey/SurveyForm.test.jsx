import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SurveyForm from './SurveyForm';

// Mock fetch
global.fetch = vi.fn();

// Mock navigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('SurveyForm', () => {
  beforeEach(() => {
    // Reset fetch mock
    fetch.mockReset();
    
    // Mock successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, id: 1 }),
    });
  });

  it('renders the first step of the survey form', () => {
    render(
      <BrowserRouter>
        <SurveyForm />
      </BrowserRouter>
    );
    
    // Instead of toBeInTheDocument, check if the element exists
    expect(screen.getByText(/Help Us Improve No-Code App Development!/i)).not.toBeNull();
    
    // Check if the first question is rendered
    expect(screen.getByText('What best describes your role?')).not.toBeNull();
  });

  it('disables the continue button when required fields are not filled', () => {
    render(
      <BrowserRouter>
        <SurveyForm />
      </BrowserRouter>
    );
    
    // Instead of toBeDisabled, check the disabled attribute
    const continueButton = screen.getByRole('button', { name: /Continue/i });
    expect(continueButton.disabled).toBe(true);
  });

  it('enables the continue button when required fields are filled', () => {
    render(
      <BrowserRouter>
        <SurveyForm />
      </BrowserRouter>
    );
    
    // Fill out required fields
    fireEvent.click(screen.getByLabelText(/Startup Founder/i));
    fireEvent.click(screen.getByLabelText(/SaaS \/ Tech/i));
    fireEvent.click(screen.getByLabelText(/Just me/i));
    
    // Instead of not.toBeDisabled, check the disabled attribute is false
    const continueButton = screen.getByRole('button', { name: /Continue/i });
    expect(continueButton.disabled).toBe(false);
  });
});