import { Graph } from '@antv/x6';

export const graphToPng = (graph: Graph): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      graph.toPNG(
        (dataUri: string) => {
          if (dataUri) {
            resolve(dataUri);
          } else {
            reject(new Error('Failed to generate PNG data URI'));
          }
        },
        {
          padding: {
            left: 25,
            right: 25,
            top: 25,
            bottom: 25,
          },
          quality: 1,
          width: 150,
          height: 125,
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};
