import { VersionRepository } from '../repositories/VersionRepository';
import { Version } from '../models/Version';
import { buildVersionEntity } from '../helpers/entityBuilder';
import { ModelRepository } from '../repositories/ModelRepository';

export class VersionService {
  private versionRepository = new VersionRepository();

  private modelRepository = new ModelRepository();

  async createVersion(data: any): Promise<Version> {
    const { modelId } = data;

    const model = await this.modelRepository.getModelById(modelId, false);
    if (!model) {
      throw new Error('Model not found');
    }

    // Find the latest version number for the given modelId
    const latestVersion =
      await this.versionRepository.getLatestVersionByModelId(modelId);
    const newVersionIndex = latestVersion ? latestVersion.versionIndex + 1 : 0;

    // Build the new version entity
    const version: Version = buildVersionEntity(data, newVersionIndex);
    version.modelId = modelId;

    // Count the existing versions for the model
    const versionCount =
      await this.versionRepository.countVersionsByModelId(modelId);

    // Check if the version count exceeds 1000
    if (versionCount >= 1000) {
      // Delete the earliest version
      await this.versionRepository.deleteEarliestVersionByModelId(modelId);
    }

    const newVersion = await this.versionRepository.createVersion(version);
    const serializedNewVersion = newVersion.toJSON();

    return serializedNewVersion;
  }

  async getAllVersions(
    sortBy: string,
    sort: 'asc' | 'desc',
    modelId?: string,
  ): Promise<{ versions: Version[]; versionsCount: number }> {
    const [versions, versionsCount] =
      await this.versionRepository.getAllVersions(sortBy, sort, modelId);
    const serializedVersions = versions.map((version) => version.toJSON());
    return { versions: serializedVersions, versionsCount };
  }

  async getVersionById(id: string): Promise<Version | null> {
    const version = await this.versionRepository.getVersionById(id);
    const serializedVersion = version!.toJSON();
    return serializedVersion;
  }

  async getLatestVersionByModelId(modelId: string): Promise<Version | null> {
    const version =
      await this.versionRepository.getLatestVersionByModelId(modelId);
    const serializedVerison = version!.toJSON();
    return serializedVerison;
  }

  async getLatestVersionThumbnailByModelId(modelId: string): Promise<string | null> {
    const versionThumbnail =
      await this.versionRepository.getLatestVersionThumbnailByModelId(modelId);
    return versionThumbnail;
  }

  async deleteVersion(id: string): Promise<void> {
    await this.versionRepository.deleteVersion(id);
  }
}
