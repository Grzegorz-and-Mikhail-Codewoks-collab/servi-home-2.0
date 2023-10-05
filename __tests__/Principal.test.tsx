import { render, screen } from '@testing-library/react';
import Principal from '../src/components/Principal';
import '@testing-library/jest-dom';

describe('Principal component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Principal />);
    expect(getByText('Schedule your cleaner')).toBeInTheDocument();
    expect(
      getByText(
        "Don't miss the opportunity to elevate your living space to a new level of cleanliness and comfort. Try our services today and experience the difference for yourself!"
      )
    ).toBeInTheDocument();
  });
});
