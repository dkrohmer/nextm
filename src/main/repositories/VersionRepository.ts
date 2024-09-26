import { validate } from 'class-validator';
import { AppDataSource } from '../database';
import { Version } from '../models/Version';

export class VersionRepository {
  private versionRepository = AppDataSource.getRepository(Version);

  /**
   * create version
   */
  async createVersion(data: Partial<Version>): Promise<Version> {
    const version = this.versionRepository.create(data);

    const validationErrors = await validate(version);
    if (validationErrors.length > 0) {
      console.error('Validation failed:', validationErrors);
      throw new Error('Validation failed');
    }

    return await this.versionRepository.save(version);
  }

  /**
   * get all versions
   */
  async getAllVersions(
    sortBy: string,
    sort: 'asc' | 'desc',
    modelId?: string,
  ): Promise<[Version[], number]> {
    const where = modelId ? { modelId } : {};

    const [versions, count] = await this.versionRepository.findAndCount({
      where,
      order: {
        [sortBy]: sort,
      },
    });

    return [versions, count];
  }

  /**
   * get one version
   */
  async getVersionById(id: string): Promise<Version | null> {
    return await this.versionRepository.findOneBy({ id });
  }

  /**
   * get lastest version
   */
  async getLatestVersionByModelId(modelId: string): Promise<Version | null> {
    return await this.versionRepository.findOne({
      where: { modelId },
      order: {
        versionIndex: 'DESC',
      },
    });
  }

  /**
   * get latest version thumbnail
   */
  async getLatestVersionThumbnailByModelId(
    modelId: string,
  ): Promise<string | null> {
    const version = await this.versionRepository.findOne({
      where: { modelId },
      order: {
        versionIndex: 'DESC',
      },
      select: ['thumbnail'],
    });
    return version ? version.thumbnail : null;
  }

  /**
   * get version count
   */
  async countVersionsByModelId(modelId: string): Promise<number> {
    return await this.versionRepository.count({ where: { modelId } });
  }

  /**
   * delete latest version
   */
  async deleteEarliestVersionByModelId(modelId: string): Promise<void> {
    const earliestVersion = await this.versionRepository.findOne({
      where: { modelId },
      order: {
        versionIndex: 'ASC',
      },
    });

    if (earliestVersion) {
      await this.versionRepository.remove(earliestVersion);
    }
  }

  /**
   * delete version
   */
  async deleteVersion(id: string): Promise<void> {
    await this.versionRepository.delete(id);
  }
}
