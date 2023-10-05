import { render, screen, fireEvent } from '@testing-library/react';

import Footer from '../src/components/Footer';
import '@testing-library/jest-dom';

describe('Footer and its main component exist', () => {
  it('Footer esxists"', () => {
    render(<Footer />);
    const myElem = screen.getByTestId('footer');
    expect(myElem).toBeInTheDocument();
  });

  it('Servi Home Container esxists"', () => {
    render(<Footer />);
    const myElem = screen.getByTestId('servi-home-container');
    expect(myElem).toBeInTheDocument();
  });
  it('Quick Links Container exists"', () => {
    render(<Footer />);
    const myElem = screen.getByTestId('quick-links-container');
    expect(myElem).toBeInTheDocument();
  });
  it('Stay Updated Container exists', () => {
    render(<Footer />);
    const myElem = screen.getByTestId('stay-updated-container');
    expect(myElem).toBeInTheDocument();
  });
  it('Follow Us Container exists', () => {
    render(<Footer />);
    const myElem = screen.getByTestId('follow-us-container');
    expect(myElem).toBeInTheDocument();
  });
});

describe('Footer hoovers', () => {
  it('Services link underlines on hover', () => {
    render(<Footer />);

    const servicesLink = screen.getByText('Services', {
      selector: '.test-hover-underline',
    });

    fireEvent.mouseEnter(servicesLink);

    expect(servicesLink).toBeVisible();
  });
  it('About Us Button underlines on hover', () => {
    render(<Footer />);

    const servicesLink = screen.getByText('About Us', {
      selector: '.test-hover-underline',
    });

    fireEvent.mouseEnter(servicesLink);

    expect(servicesLink).toBeVisible();
  });
  it('Contact Button underlines on hover', () => {
    render(<Footer />);

    const servicesLink = screen.getByText('Contact', {
      selector: '.test-hover-underline',
    });

    fireEvent.mouseEnter(servicesLink);

    expect(servicesLink).toBeVisible();
  });
});

describe('Footer', () => {
  it('renders Services Link correctly', () => {
    render(<Footer />);

    // Find the services link by its test ID
    const servicesLink: any = screen
      .getByTestId('services-link')
      .querySelector('a');

    // Assert the href and text content of the link
    expect(servicesLink.getAttribute('href')).toBe('/services');
    expect(servicesLink.textContent).toBe('Services');
  });
});
