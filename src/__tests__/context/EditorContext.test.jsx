import { renderHook, act } from '@testing-library/react-hooks';
import { EditorProvider, EditorContext } from '../../context/EditorContext';

describe('EditorContext', () => {
  const wrapper = ({ children }) => <EditorProvider>{children}</EditorProvider>;

  test('should provide initial values', () => {
    const { result } = renderHook(() => React.useContext(EditorContext), { wrapper });

    expect(result.current.text).toBe('');
    expect(result.current.emoji).toBe('😐');
    expect(result.current.resultText).toBe('');
    expect(result.current.entryDatetime).toBeInstanceOf(Date);
  });

  test('should update text value', () => {
    const { result } = renderHook(() => React.useContext(EditorContext), { wrapper });

    act(() => {
      result.current.setText('New text');
    });

    expect(result.current.text).toBe('New text');
  });

  test('should update emoji value', () => {
    const { result } = renderHook(() => React.useContext(EditorContext), { wrapper });

    act(() => {
      result.current.setEmoji('😀');
    });

    expect(result.current.emoji).toBe('😀');
  });

  test('should reset editor values', () => {
    const { result } = renderHook(() => React.useContext(EditorContext), { wrapper });

    act(() => {
      result.current.setText('New text');
      result.current.setEmoji('😀');
      result.current.setResultText('Result');
      result.current.setEntryDatetime(new Date('2022-01-01T00:00:00Z'));

      result.current.saveToLocalStorage();  // This should trigger the reset
    });

    expect(result.current.text).toBe('');
    expect(result.current.emoji).toBe('😐');
    expect(result.current.resultText).toBe('');
    expect(result.current.entryDatetime).toBeInstanceOf(Date); // Should be reset to current date/time
  });

  test('should save to local storage and reset editor', () => {
    const { result } = renderHook(() => React.useContext(EditorContext), { wrapper });

    act(() => {
      result.current.setText('Test entry');
      result.current.setEmoji('😀');
      result.current.saveToLocalStorage();
    });

    const savedEntries = JSON.parse(localStorage.getItem('entries'));

    expect(savedEntries).toHaveLength(1);
    expect(savedEntries[0]).toMatchObject({ emoji: '😀' });

    // Ensure the editor state is reset after saving
    expect(result.current.text).toBe('');
    expect(result.current.emoji).toBe('😐');
  });
});