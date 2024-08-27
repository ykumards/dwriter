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

  test('updates text state when user types in the textarea', () => {
    const setText = vi.fn();
    setup({ setText });

    const textarea = screen.getByPlaceholderText('Start typing...');
    fireEvent.change(textarea, { target: { value: 'Hello, world!' } });

    expect(setText).toHaveBeenCalledWith('Hello, world!');
  });

  test('textarea adjusts height automatically as text is typed', () => {
    const { container } = setup();

    const textarea = screen.getByPlaceholderText('Start typing...');
    fireEvent.change(textarea, { target: { value: 'First line\nSecond line' } });

    expect(textarea.style.height).toBe(`${textarea.scrollHeight}px`);
  });
});