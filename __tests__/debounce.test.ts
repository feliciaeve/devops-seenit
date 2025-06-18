import { debounce } from '../lib/debounce';

jest.useFakeTimers();

describe('debounce', () => {
  it('should call the function after the wait time', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn('hello');
    expect(mockFn).not.toBeCalled();

    // fast-forward time
    jest.advanceTimersByTime(500);
    expect(mockFn).toBeCalledWith('hello');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should only call the latest function when called multiple times quickly', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 300);

    debouncedFn('first');
    debouncedFn('second');
    debouncedFn('third');

    jest.advanceTimersByTime(299);
    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalledWith('third');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should work with no arguments passed to the callback', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn();
    jest.advanceTimersByTime(200);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
