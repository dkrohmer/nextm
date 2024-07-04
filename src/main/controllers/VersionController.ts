// src/controllers/ProductController.ts

import { ipcMain } from 'electron';
import { VersionService } from '../services/VersionService';

function validateSortDirection(sort: string): boolean {
  return ['asc', 'desc'].includes(sort);
}


// src/controllers/ModelController.ts
export class VersionController {
  private versionService: VersionService;

  constructor() {
      this.versionService = new VersionService();
      this.initializeModelHandlers();
  }

  destroy() {
    ipcMain.removeHandler('create-version');
    ipcMain.removeHandler('get-all-versions');
    ipcMain.removeHandler('get-version-by-id');
    ipcMain.removeHandler('get-latest-version');
    ipcMain.removeHandler('delete-version');
  }

  private initializeModelHandlers() {
    /**
     * create-version
     */
    ipcMain.handle('create-version', async (_event, data) => {
      try {
        const { modelId }: { modelId: string } = data
        const { payload }: { payload: any } = data
        const { thumbnail }: { thumbnail: string } = data
        const { x }: { x: number } = data
        const { y }: { y: number } = data
        const { width }: { width: number } = data
        const { height }: { height: number } = data

        const graphJson = JSON.stringify(payload.graph)

        const newVersion = await this.versionService.createVersion({ modelId, thumbnail, payload: graphJson, x, y, width, height });

        // Return the created version with the graph still as an object for immediate use
        return { ...newVersion, payload: graphJson };
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * get-all-versions
     */
    ipcMain.handle('get-all-versions', async (_event, data) => { 
      try {
        let sort = data.sort as 'asc' | 'desc';
        let sortby = data.sortby as string || 'createdAt';
        const modelId = data.modelId as string | undefined;
  
        sortby = 'createdAt'; // default sort field if invalid
        
        if (!validateSortDirection(sort)) {
          sort = 'desc'; // Default to ascending if invalid
        }
  
        const { versions, versionsCount } = await this.versionService.getAllVersions(sortby, sort, modelId);
  
        if (versions) {
          return  { versions, versionsCount }
        } else {
          throw new Error('Failed to get versions')
        }
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * get-version-by-id
     */
    ipcMain.handle('get-version-by-id', async (_event, data) => {
      try {
        const { versionId }: { versionId: string } = data
        const version = await this.versionService.getVersionById(versionId);
        if (version) {
          const payloadWithParsedGraph = {
            ...version,
            payload: JSON.parse(version.payload) // Parse the payload back to JSON object
          };
          return payloadWithParsedGraph
        } else {
          throw new Error('Failed to get version')
        }
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * get-latest-version
     */
    ipcMain.handle('get-latest-version', async (_event, data) => {
      try {
        const modelId = data.modelId as string;

        if (!modelId) {
          throw new Error('No modelId provided')
        }
  
        const latestVersion = await this.versionService.getLatestVersionByModelId(modelId);
        if (latestVersion) {
          const payloadWithParsedGraph = {
            ...latestVersion,
            payload: JSON.parse(latestVersion.payload),
          };
          // console.log(payloadWithParsedGraph)

          return payloadWithParsedGraph
        } else {
          throw new Error('Failed to get latest version')
        }
      } catch (error) {
        console.error(error);
      }    
    });
    
    /**
     * delete-version
     */
    ipcMain.handle('delete-version', async (_event, data) => {
      try {
        const { modelId }: { modelId: string } = data
        await this.versionService.deleteVersion(modelId);
      } catch (error) {
        console.error(error)
      }
    });
  }
}
