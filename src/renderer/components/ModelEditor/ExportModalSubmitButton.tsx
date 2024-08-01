import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Graph } from '@antv/x6';
import { handleExportModalSubmit } from '../../utils/model-editor/exportModalHandlers';

interface ExportModalSubmitProps {
  format: string;
  filename: string;
  graph: Graph;
}

const ExportModalSubmit: React.FC<ExportModalSubmitProps> = ({ format, filename, graph }) => {
  const dispatch = useDispatch();

  return (
    <Form.Button primary type="button" onClick={() => handleExportModalSubmit(format, filename, graph, dispatch)}>
      Export
    </Form.Button>
  );
};

export default ExportModalSubmit;
