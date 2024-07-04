import React, { useState, useEffect, useRef } from 'react';
import {
  Accordion,
  Button,
  Form,
  Header,
  Icon,
  Input,
  Popup,
  Segment,
  Sidebar,
  Radio,
  Checkbox,
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import {
  showToast,
  setSidebarVisible,
  setGridVisible,
  setDatabasePath,
  setExplicitObjectSelection,
} from '../store/SettingsStore'; // Adjust the import path as necessary

const SideBar: React.FC = () => {
  const { sidebarVisible, gridVisible, explicitObjectSelection, path } =
    useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [useDefaultDatabase, setUseDefaultDatabase] = useState<boolean>(true);
  const [inputPath, setInputPath] = useState<string>('default');
  const [buttonLabel, setButtonLabel] = useState<string>('Open');

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.electron.getDefaultDbPath().then((defaultPath: string) => {
      if (path === defaultPath) {
        setUseDefaultDatabase(true);
        setInputPath(defaultPath);
      } else {
        setUseDefaultDatabase(false);
        setInputPath(path);
      }
    });
  }, [path]);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const handleDatabaseTypeChange = async (
    _: React.FormEvent<HTMLInputElement>,
    { value }: any,
  ) => {
    const isDefault = value === 'default';
    setUseDefaultDatabase(isDefault);
    setButtonLabel('Open'); // Reset button label

    if (isDefault) {
      const defaultPath = await window.electron.getDefaultDbPath();
      setInputPath(defaultPath);
    } else {
      setInputPath('');
    }
  };

  const handleOpenFilePicker = async () => {
    try {
      const filePath = await window.electron.openFilePicker();
      setInputPath(filePath);
      setButtonLabel('Open');
    } catch (err) {
      console.error('Error selecting file:', err);
    }
  };

  const handleOpenDirectoryPicker = async () => {
    try {
      const directoryPath = await window.electron.openDirectoryPicker();
      setInputPath(directoryPath);
      setButtonLabel('Create');
    } catch (err) {
      console.error('Error selecting directory:', err);
    }
  };

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPath(e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      if (!inputPath) {
        throw new Error('Please enter a valid path.');
      }

      new Promise(async (resolve, reject) => {
        let result;
        try {
          if (buttonLabel === 'Create') {
            result = await window.electron.createDatabase(inputPath);
          } else if (buttonLabel === 'Open') {
            result = await window.electron.openDatabase(inputPath);
          }

          if (result.success) {
            window.electron.getCurrentDbPath().then((currentPath: string) => {
              dispatch(setDatabasePath(currentPath));
              dispatch(
                showToast({
                  promise: Promise.resolve(), // Resolve immediately since there's no async operation
                  loadingMessage: '', // No loading message needed
                  successMessage: `Current database: ${currentPath}`, // Success message with grid type
                  errorMessage: '', // No error message needed
                }),
              );
              navigate('/');
              resolve(`Database set successfully:`);
            });
          } else {
            reject('Operation failed on backend.');
          }
        } catch (error) {
          reject('Error processing form submission.');
        }
      });
    } catch (error) {
      console.error('Error processing form submission:', error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      dispatch(setSidebarVisible(false));
    }
  };

  const handleGridChange = (
    _: React.FormEvent<HTMLInputElement>,
    { value }: any,
  ) => {
    window.electron.setGridType(value);
    dispatch(setGridVisible(value));
    // Show toast notification for success
    dispatch(
      showToast({
        promise: Promise.resolve(), // Resolve immediately since there's no async operation
        loadingMessage: '', // No loading message needed
        successMessage: `Grid type changed to: ${value}`, // Success message with grid type
        errorMessage: '', // No error message needed
      }),
    );
  };

  const handleExplicitObjectSelectionChange = () => {
    window.electron.setExplicitObjectSelection(!explicitObjectSelection);
    dispatch(setExplicitObjectSelection(!explicitObjectSelection));
    dispatch(
      showToast({
        promise: Promise.resolve(), // Resolve immediately since there's no async operation
        loadingMessage: '', // No loading message needed
        successMessage: `Explicit object selection ${!explicitObjectSelection ? 'active' : 'inactive'}`, // Success message with grid type
        errorMessage: '', // No error message needed
      }),
    );
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isSetDatabaseDisabled = !inputPath || inputPath === path;

  return (
    <Sidebar
      as={Segment}
      animation="push"
      icon="labeled"
      inverted
      vertical
      visible={sidebarVisible}
      width="wide"
      direction="right"
      style={{ padding: '15px' }}
    >
      <Header as="h1" inverted>
        Settings
      </Header>
      <Accordion inverted>
        <Segment
          inverted
          style={{ border: '0.5px solid gray', borderRadius: '4px' }}
        >
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={() => handleAccordionClick(0)}
          >
            <h2>
              <Icon name={`caret ${activeIndex === 0 ? `down` : `right`}`} />
              General settings
            </h2>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Segment basic>
              <Form inverted>
                <div>
                  <h3 style={{ display: 'inline-block' }}>
                    <label>Database Type</label>
                  </h3>
                  <Popup
                    trigger={
                      <Icon
                        name="info circle"
                        style={{ display: 'inline-block', paddingLeft: '10px' }}
                        inverted
                      />
                    }
                    content={`By default, the database is stored in the app's respective user data folder depending on your operating system. However, you may also specify a custom database directory of your choice.`}
                  />
                </div>
                <Form.Field>
                  <Radio
                    label="Default database"
                    name="databaseType"
                    value="default"
                    checked={useDefaultDatabase}
                    onChange={handleDatabaseTypeChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Custom database"
                    name="databaseType"
                    value="custom"
                    checked={!useDefaultDatabase}
                    onChange={handleDatabaseTypeChange}
                  />
                </Form.Field>
                {!useDefaultDatabase && (
                  <>
                    <Form.Field>
                      <Button primary onClick={handleOpenFilePicker}>
                        Open existing
                      </Button>
                      <Button primary onClick={handleOpenDirectoryPicker}>
                        Create new
                      </Button>
                    </Form.Field>
                    <Form.Field>
                      <Popup
                        trigger={
                          <Input
                            placeholder={path}
                            value={inputPath}
                            onChange={handlePathChange}
                            readOnly
                            style={{
                              direction: 'rtl',
                              textOverflow: 'ellipsis',
                            }}
                          />
                        }
                        content={`${inputPath || path}`}
                      />
                    </Form.Field>
                  </>
                )}
                <Button
                  primary
                  disabled={isSetDatabaseDisabled}
                  onClick={handleFormSubmit}
                >
                  {buttonLabel}
                </Button>
              </Form>
            </Segment>
          </Accordion.Content>
        </Segment>

        <Segment
          inverted
          style={{ border: '0.5px solid gray', borderRadius: '4px' }}
        >
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={() => handleAccordionClick(1)}
          >
            <h2>
              <Icon name={`caret ${activeIndex === 1 ? `down` : `right`}`} />
              Model Editor Settings
            </h2>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Segment basic>
              <Form inverted>
                <div>
                  <h3 style={{ display: 'inline-block' }}>
                    <label>Set grid type</label>
                  </h3>
                  <Popup
                    trigger={
                      <Icon
                        name="info circle"
                        style={{ display: 'inline-block', paddingLeft: '10px' }}
                        inverted
                      />
                    }
                    content="Choose the type of grid for the model editor."
                  />
                </div>
                <Form.Field>
                  <Radio
                    label="None"
                    name="gridVisible"
                    value="none"
                    checked={gridVisible === 'none'}
                    onChange={handleGridChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Dot"
                    name="gridVisible"
                    value="dot"
                    checked={gridVisible === 'dot'}
                    onChange={handleGridChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Mesh"
                    name="gridVisible"
                    value="mesh"
                    checked={gridVisible === 'mesh'}
                    onChange={handleGridChange}
                  />
                </Form.Field>
              </Form>

              {/*
                  Require selection before context menu 
                */}
              <Form inverted style={{ paddingTop: '50px' }}>
                <div>
                  <h3 style={{ display: 'inline-block' }}>
                    <label>Set explicit object selection</label>
                  </h3>
                  <Popup
                    trigger={
                      <Icon
                        name="info circle"
                        style={{ display: 'inline-block', paddingLeft: '10px' }}
                        inverted
                      />
                    }
                    content="If explicit object selection is active, you cannot context-click an object unless it has previously been selected with a left mouse click."
                  />
                </div>
                <Form.Field>
                  <Checkbox
                    label={explicitObjectSelection ? 'Active' : 'Inactive'}
                    checked={explicitObjectSelection}
                    onChange={handleExplicitObjectSelectionChange} // Update state on change
                  />
                </Form.Field>
              </Form>
            </Segment>
          </Accordion.Content>
        </Segment>
      </Accordion>
    </Sidebar>
  );
};

export default SideBar;
