import { render, screen } from '@testing-library/react';
import {userEvent } from '@testing-library/user-event'
import { useContext, createContext } from 'react';
import Layout from '../src/components/Layout';
import '@testing-library/jest-dom';
//import { NextRouter } from 'next/router';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');


describe('Layout overall', () => {

  const children = <div>Some text</div>
  it.failing('should render correctly', () => {
    const { getByText } = render(<Layout children={children}/>);
    //expect(1).toBe(1)
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText("Reviews")).toBeInTheDocument();
  });
});


describe('Layout elements', () => {
  const children = <div>Some text</div>

  beforeAll(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      push: jest.fn(),
    }) );
  });

  afterAll(() => {
    useRouter.mockRestore();
  });



  it.failing('should render the correct navigation links for a logged-in user', () => {
    const user = {
        id: 1,
        name: 'John Doe',
      }
    const UserContext = createContext(user)
    const { getByText, queryByText } = render(
      <UserContext.Provider value={user}>
        <Layout children={children}/>
      </UserContext.Provider>
      );
      //expect(1).toBe(1)
    expect(getByText('Orders Dashboard')).toBeInTheDocument();
    expect(queryByText('Log Out')).toBeInTheDocument();
  });

  it('should render the correct navigation links', () => {
    render(<Layout children={children}/>);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    });
  
});
