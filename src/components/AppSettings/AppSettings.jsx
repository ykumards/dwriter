import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaMoon, FaSun } from 'react-icons/fa';
import * as Styles from './AppSettingsStyles';
import { EditorContext } from '../../context/EditorContext';

const AppSettings = ({ onClose }) => {
  const { theme, setTheme, fontFamily, setFontFamily, fontSize, setFontSize } = useContext(EditorContext);

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
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
          <Styles.ModalTitle>Settings</Styles.ModalTitle>
          <Styles.CloseButton onClick={onClose}>×</Styles.CloseButton>
        </Styles.ModalHeader>

        <Styles.ModalBody>
          <Styles.Section>
            <Styles.SectionTitle>Theme</Styles.SectionTitle>
            <Styles.SettingRow>
              <Styles.SettingLabel>Dark Mode</Styles.SettingLabel>
              <Styles.ThemeToggle onClick={handleThemeChange}>
                {theme === 'light' ? <FaSun /> : <FaMoon />}
              </Styles.ThemeToggle>
            </Styles.SettingRow>
          </Styles.Section>

          <Styles.Section>
            <Styles.SectionTitle>Typography</Styles.SectionTitle>
            <Styles.SettingRow>
              <Styles.SettingLabel>Font Family</Styles.SettingLabel>
              <Styles.Select value={fontFamily} onChange={handleFontFamilyChange}>
                <option value="Georgia">Georgia</option>
                <option value="Palatino">Palatino</option>
                <option value="Baskerville">Baskerville</option>
                <option value="Garamond">Garamond</option>
                <option value="Cambria">Cambria</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Courier New">Courier New</option>
                <option value="Menlo">Menlo</option>
              </Styles.Select>
            </Styles.SettingRow>
            
            <Styles.SettingRow>
              <Styles.SettingLabel>Font Size</Styles.SettingLabel>
              <Styles.Select value={fontSize} onChange={handleFontSizeChange}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Styles.Select>
            </Styles.SettingRow>
          </Styles.Section>
        </Styles.ModalBody>
      </Styles.ModalContent>
    </Styles.ModalOverlay>
  );
};

AppSettings.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AppSettings;