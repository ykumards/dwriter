import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaMoon, FaSun } from 'react-icons/fa';
import * as Styles from './ThemeSettingsStyles';
import { EditorContext } from '../../context/EditorContext';

const ThemeSettings = ({ onClose }) => {
  const { theme, setTheme } = useContext(EditorContext);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <Styles.ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Styles.ModalContent
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Styles.ModalHeader>
          <Styles.ModalTitle>Theme Settings</Styles.ModalTitle>
          <Styles.CloseButton onClick={onClose}>×</Styles.CloseButton>
        </Styles.ModalHeader>

        <Styles.ModalBody>
          <Styles.ThemeOptions>
            <Styles.ThemeOption 
              $isActive={theme === 'light'} 
              onClick={() => handleThemeChange('light')}
            >
              <FaSun style={{ marginRight: '8px' }} />
              Light Theme
            </Styles.ThemeOption>
            
            <Styles.ThemeOption 
              $isActive={theme === 'dark'} 
              onClick={() => handleThemeChange('dark')}
            >
              <FaMoon style={{ marginRight: '8px' }} />
              Dark Theme
            </Styles.ThemeOption>
          </Styles.ThemeOptions>
        </Styles.ModalBody>
      </Styles.ModalContent>
    </Styles.ModalOverlay>
  );
};

ThemeSettings.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ThemeSettings;