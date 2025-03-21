import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaCalendarAlt, FaCog, FaSave, FaFileExport, FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Tooltip from '@radix-ui/react-tooltip';
import { BottomToolbarStyles } from './BottomToolbarStyles';

const BottomToolbar = ({ 
  currentComponent, 
  onNavClick, 
  showEmoji, 
  setShowEmoji, 
  onSave,
  onExport,
  isExporting
}) => {
  return (
    <Tooltip.Provider delayDuration={300}>
      <BottomToolbarStyles.Container>
        <BottomToolbarStyles.ToolbarContent>
        <BottomToolbarStyles.LeftControls>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <BottomToolbarStyles.IconButton 
                isActive={currentComponent === 'editor'}
                onClick={() => onNavClick('editor')}
                whileTap={{ scale: 0.95 }}
              >
                <FaHome />
              </BottomToolbarStyles.IconButton>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content 
                sideOffset={5}
                side="top"
                className="TooltipContent"
              >
                Journal
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <BottomToolbarStyles.IconButton 
                isActive={currentComponent === 'calendar'}
                onClick={() => onNavClick('calendar')}
                whileTap={{ scale: 0.95 }}
              >
                <FaCalendarAlt />
              </BottomToolbarStyles.IconButton>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content 
                sideOffset={5}
                side="top"
                className="TooltipContent"
              >
                Calendar
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <BottomToolbarStyles.IconButton 
                isActive={currentComponent === 'settings'}
                onClick={() => onNavClick('settings')}
                whileTap={{ scale: 0.95 }}
              >
                <FaCog />
              </BottomToolbarStyles.IconButton>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content 
                sideOffset={5}
                side="top"
                className="TooltipContent"
              >
                Settings
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </BottomToolbarStyles.LeftControls>

        <BottomToolbarStyles.CenterControls>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <BottomToolbarStyles.ToggleButton 
                onClick={() => setShowEmoji(!showEmoji)}
                isActive={showEmoji}
                whileTap={{ scale: 0.95 }}
              >
                {showEmoji ? (
                  <><FaEye style={{ marginRight: '6px' }} /> Live Emotion</>
                ) : (
                  <><FaEyeSlash style={{ marginRight: '6px' }} /> Hide Emotion</>
                )}
              </BottomToolbarStyles.ToggleButton>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content 
                sideOffset={5}
                side="top"
                className="TooltipContent"
              >
                {showEmoji ? 'Showing emotion in real-time' : 'Emotion display hidden'}
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </BottomToolbarStyles.CenterControls>

        <BottomToolbarStyles.RightControls>
          {currentComponent === 'editor' ? (
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <BottomToolbarStyles.SaveButton 
                  onClick={onSave}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSave style={{ marginRight: '8px' }} />
                  Save
                </BottomToolbarStyles.SaveButton>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  sideOffset={5}
                  side="top"
                  className="TooltipContent"
                >
                  Shortcut: Cmd+Enter
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          ) : (
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <BottomToolbarStyles.SaveButton 
                  onClick={onExport}
                  disabled={isExporting}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaFileExport style={{ marginRight: '8px' }} />
                  Export
                </BottomToolbarStyles.SaveButton>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  sideOffset={5}
                  side="top"
                  className="TooltipContent"
                >
                  Export emotions as JSON
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          )}
        </BottomToolbarStyles.RightControls>
        </BottomToolbarStyles.ToolbarContent>
      </BottomToolbarStyles.Container>
    </Tooltip.Provider>
  );
};

export default BottomToolbar;