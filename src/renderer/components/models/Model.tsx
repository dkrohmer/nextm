// /src/renderer/components/models/Model.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Dimmer,
  Icon,
  Image,
  List,
  Loader,
  Message,
  Popup,
} from 'semantic-ui-react';

import { useDispatch } from 'react-redux';
import type { IModel } from '../../interfaces/IModel';
import type { IIncrement } from '../../interfaces/IIncrement';
import type { IProduct } from '../../interfaces/IProduct';

import { AppDispatch } from '../../store';

import {
  setModelsCurrentModel,
  setModelsModalOpen,
  setModelsConfirmOpen,
  setModelToDelete,
  setModelsIsEditing,
  setModelsIsCloning,
} from '../../store/ModelsStore';

import thumbnail from '../../../../assets/thumbnail.png'

import { fetchLatestVersion } from '../../store/VersionsStore';

interface ModelProps {
  model: IModel;
  increment: IIncrement;
  product: IProduct;
}

const Model: React.FC<ModelProps> = ({
  model,
  increment,
  product,
  // handleDelete,
  // openEditModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // global redux states
  // const {
  //   latestVersion,
  //   latestVersionError,
  //   latestVersionIsLoaded,
  //   latestVersionIsLoading
  // } = useSelector((state: RootState) => state.versions);

  // local states
  const [localVersion, setLocalVersion] = useState<{
    thumbnail: string | null;
  }>({ thumbnail: null });
  const [isVersionLoading, setIsVersionLoading] = useState(false);
  const [versionError, setVersionError] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement>,
    model: IModel,
  ) => {
    e.stopPropagation();
    dispatch(setModelsCurrentModel(model)); // Set current product for editing
    dispatch(setModelsModalOpen(true));
    dispatch(setModelsIsEditing(true));
  };

  const handleClone = (
    e: React.MouseEvent<HTMLButtonElement>,
    model: IModel,
  ) => {
    e.stopPropagation();
    dispatch(setModelsIsCloning(true));
    dispatch(setModelsCurrentModel({ ...model, name: `${model.name} (Copy)` })); // Set the increment to clone
    dispatch(setModelsModalOpen(true)); // Open the modal
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    modelId: string,
  ) => {
    e.stopPropagation();
    dispatch(setModelToDelete(modelId));
    dispatch(setModelsConfirmOpen(true));
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        setIsVersionLoading(true);
        const version = await dispatch(
          fetchLatestVersion({ modelId: model.id }),
        ).unwrap();
        setLocalVersion({ thumbnail: version.thumbnail });
        setIsVersionLoading(false);
      } catch (err) {
        setVersionError('Failed to load version.');
        setIsVersionLoading(false);
      }
    };

    fetchVersion();
  }, [model, dispatch]);

  return (
    <div>
      <Dimmer active={isVersionLoading} inverted>
        <Loader>Loading model...</Loader>
      </Dimmer>

      {/* Error handling */}
      {versionError && (
        <Message negative style={{ textAlign: 'center' }}>
          <Message.Header>Error❗️</Message.Header>
          <p>{versionError}</p>
        </Message>
      )}

      {/* Normal behavior */}
      {localVersion && !versionError && !isVersionLoading && product && (
        <List.Item
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="clickable-row"
          key={model.id}
          style={{
            cursor: 'pointer',
            alignItems: 'center',
            display: 'flex',
            padding: '10px',
            borderRadius: '5px',
            border: '0px',
          }}
          // as='a'
          onClick={() =>
            navigate(
              `/products/${product.id}/increments/${increment.id}/models/${model.id}`,
            )
          }
        >
          <Image
            src={localVersion.thumbnail || thumbnail}
            style={{
              width: '150px',
              marginRight: '10px',
              border: '0.5px solid gray',
            }}
          />
          <List.Content style={{ flex: 1, marginRight: '10px' }}>
            <List.Header
              as="h3"
              onClick={() =>
                navigate(
                  `/products/${product.id}/increments/${increment.id}/models/${model.id}`,
                )
              }
            >
              {model.name}
            </List.Header>
            <List.Description>
              Created at: {new Date(model.createdAt).toLocaleString()}
            </List.Description>
          </List.Content>
          {isHovering && (
            <List.Content style={{ display: 'flex', alignItems: 'center' }}>
              <Popup
                trigger={
                  <Button
                    icon
                    size="tiny"
                    onClick={(e) => {
                      handleEdit(e, model);
                    }}
                  >
                    <Icon name="pencil" />
                  </Button>
                }
                content={`Edit model "${model.name}"`}
              />

              <Popup
                trigger={
                  <Button
                    icon
                    size="tiny"
                    onClick={(e) => {
                      handleClone(e, model);
                    }}
                  >
                    <Icon name="clone" />
                  </Button>
                }
                content={`Clone model "${model.name}"`}
              />

              <Popup
                trigger={
                  <Button
                    icon
                    size="tiny"
                    onClick={(e) => {
                      handleDelete(e, model.id);
                    }}
                  >
                    <Icon color="red" name="trash" />
                  </Button>
                }
                content={`Delete model "${model.name}"`}
              />
            </List.Content>
          )}
        </List.Item>
      )}
    </div>
  );
};

export default Model;
