import { validate } from 'class-validator';
import { AppDataSource } from '../database';
import { Version } from '../models/Version';

export class VersionRepository {
  private versionRepository = AppDataSource.getRepository(Version);

  async createVersion(data: Partial<Version>): Promise<Version> {
    const version = this.versionRepository.create(data);

    const validationErrors = await validate(version);
    if (validationErrors.length > 0) {
      console.error('Validation failed:', validationErrors);
      throw new Error('Validation failed');
    }

    return await this.versionRepository.save(version);
  }

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

  async getVersionById(id: string): Promise<Version | null> {
    return await this.versionRepository.findOneBy({ id });
  }

  async getLatestVersionByModelId(modelId: string): Promise<Version | null> {
    return await this.versionRepository.findOne({
      where: { modelId },
      order: {
        versionIndex: 'DESC',
      },
    });
  }

  async getLatestVersionThumbnailByModelId(modelId: string): Promise<string | null> {
    const version = await this.versionRepository.findOne({
      where: { modelId },
      order: {
        versionIndex: 'DESC',
      },
      select: ['thumbnail'],
    });
    return version ? version.thumbnail : null;
  }
  

  async countVersionsByModelId(modelId: string): Promise<number> {
    return await this.versionRepository.count({ where: { modelId } });
  }

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

  async deleteVersion(id: string): Promise<void> {
    await this.versionRepository.delete(id);
  }
}
