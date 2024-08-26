import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Editor from '../../components/Editor';
import { EditorContext } from '../../context/EditorContext';

describe('Editor Component', () => {
  const setup = (overrideValues = {}) => {
    const defaultValues = {
      text: '',
      setText: vi.fn(),
      emoji: '😀',
      setEmoji: vi.fn(),
      resultText: '',
      setResultText: vi.fn(),
      entryDatetime: new Date(),
      setEntryDatetime: vi.fn(),
      saveToLocalStorage: vi.fn(),
    };

    const values = { ...defaultValues, ...overrideValues };

    return render(
      <EditorContext.Provider value={values}>
        <Editor loading={false} worker={{ current: { postMessage: vi.fn(), onmessage: null } }} />
      </EditorContext.Provider>
    );
  };

  test('toggles the emoji display when the switch is clicked', () => {
    setup();

    // Initially, emoji should be displayed
    expect(screen.getByText('😀')).toBeInTheDocument();

    // Find the toggle switch and click it
    const toggleSwitch = screen.getByRole('checkbox');
    fireEvent.click(toggleSwitch);

    // Emoji should be hidden
    expect(screen.queryByText('😀')).not.toBeInTheDocument();

    // Click it again to show the emoji
    fireEvent.click(toggleSwitch);
    expect(screen.getByText('😀')).toBeInTheDocument();
  });

  test('displays loading message when loading is true', () => {
    setup({ loading: true });

    expect(screen.getByText('Loading Model')).toBeInTheDocument();
  });

  test('updates text state when user types in the textarea', () => {
    const setText = vi.fn();
    setup({ setText });

    const textarea = screen.getByPlaceholderText('Start typing...');
    fireEvent.change(textarea, { target: { value: 'Hello, world!' } });

    expect(setText).toHaveBeenCalledWith('Hello, world!');
  });

  test('updates emoji and result text when worker returns data', async () => {
    const setEmoji = vi.fn();
    const setResultText = vi.fn();
    const worker = {
      current: {
        postMessage: vi.fn(),
        onmessage: vi.fn(), // Simulate onmessage as a function
      },
    };

    setup({ setEmoji, setResultText, worker });

    // Simulate worker response
    const event = new MessageEvent('message', {
      data: {
        status: 'complete',
        output: [{ label: 'joy' }],
      },
    });

    // Trigger the onmessage event manually
    worker.current.onmessage(event);

    await waitFor(() => {
      expect(setResultText).toHaveBeenCalledWith('joy');
      expect(setEmoji).toHaveBeenCalledWith('😀');
    });
  });

  test('calls saveToLocalStorage when Ctrl+Enter is pressed', () => {
    const saveToLocalStorage = vi.fn();
    setup({ saveToLocalStorage });

    fireEvent.keyDown(window, { key: 'Enter', ctrlKey: true });

    expect(saveToLocalStorage).toHaveBeenCalled();
  });

  test('textarea adjusts height automatically as text is typed', () => {
    const { container } = setup();

    const textarea = screen.getByPlaceholderText('Start typing...');
    fireEvent.change(textarea, { target: { value: 'First line\nSecond line' } });

    expect(textarea.style.height).toBe(`${textarea.scrollHeight}px`);
  });
});