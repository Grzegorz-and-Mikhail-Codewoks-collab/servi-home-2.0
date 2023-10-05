import { useAuth, useCleaner } from '../src/lib/store';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';


describe('useAuth', () => {
  it('should initialize with null auth', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.auth).toBeNull();
  });

  it('should allow setting and removing auth', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.setAuth('test-auth');
    })
    expect(result.current.auth).toEqual('test-auth');
    
    act(() => {
      result.current.removeAuth();
    })
    expect(result.current.auth).toBeNull();
  });
});

describe('useCleaner', () => {
  it('should initialize with null cleaner', () => {
    const { result } = renderHook(() => useCleaner());
    expect(result.current.cleaner).toBeNull();
  });

  it('should allow setting and removing cleaner', () => {
    const { result } = renderHook(() => useCleaner());

    act(() => {
      result.current.setCleaner('test-cleaner');
    })
      expect(result.current.cleaner).toEqual('test-cleaner');

    act(() => {   
      result.current.removeCleaner();
    })
      expect(result.current.cleaner).toBeNull();
  }); 
}); 