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

  // Add test for yes/no radio button functionality
  it('properly toggles yes/no radio buttons on SurveyStep2', async () => {
    const { rerender } = render(
      <BrowserRouter>
        <SurveyForm />
      </BrowserRouter>
    );
    
    // Complete step 1
    fireEvent.click(screen.getByLabelText(/Startup Founder/i));
    fireEvent.click(screen.getByLabelText(/SaaS \/ Tech/i));
    fireEvent.click(screen.getByLabelText(/Just me/i));
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
    
    // Verify we're on step 2
    expect(screen.getByText(/Do you need \(or have you ever needed\) to build an app/i)).not.toBeNull();
    
    // Test the "Yes" option
    fireEvent.click(screen.getByLabelText(/Yes/i));
    
    // Check that challenges section appears
    expect(screen.getByText(/what challenges are you facing/i)).not.toBeNull();
    
    // Test the "No" option
    fireEvent.click(screen.getByLabelText(/No/i));
    
    // Check that challenges section disappears
    expect(screen.queryByText(/what challenges are you facing/i)).toBeNull();
  });
});