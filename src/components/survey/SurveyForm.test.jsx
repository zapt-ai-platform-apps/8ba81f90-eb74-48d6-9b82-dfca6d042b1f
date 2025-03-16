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
    
    // Check if the form title is rendered
    expect(screen.getByText(/Help Us Improve No-Code App Development!/i)).toBeInTheDocument();
    
    // Check if the first question is rendered
    expect(screen.getByText('What best describes your role?')).toBeInTheDocument();
  });

  it('disables the continue button when required fields are not filled', () => {
    render(
      <BrowserRouter>
        <SurveyForm />
      </BrowserRouter>
    );
    
    // The continue button should be disabled initially
    const continueButton = screen.getByRole('button', { name: /Continue/i });
    expect(continueButton).toBeDisabled();
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
    
    // The continue button should be enabled now
    const continueButton = screen.getByRole('button', { name: /Continue/i });
    expect(continueButton).not.toBeDisabled();
  });
});