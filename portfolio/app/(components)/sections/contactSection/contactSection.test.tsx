import { render, screen } from '@testing-library/react';
import ContactSection from './contactSection';

describe('ContactSection', () => {
  test('renders all four contact cards', () => {
    render(<ContactSection />);
    expect(screen.getByText(/Email Me/i)).toBeInTheDocument();
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByText(/Discord/i)).toBeInTheDocument();
  });

  test('email card links to mailto', () => {
    render(<ContactSection />);
    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    expect(emailLink).toHaveAttribute(
      'href',
      'mailto:davidesparzaj22@gmail.com',
    );
  });

  test('linkedin card opens in new tab', () => {
    render(<ContactSection />);
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('github card opens in new tab', () => {
    render(<ContactSection />);
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('discord card displays username', () => {
    render(<ContactSection />);
    expect(screen.getByText('juandavid_35956')).toBeInTheDocument();
  });
});
