import { AppDataSource } from '../database';
import { Version } from '../models/Version';

export class VersionRepository {
  private versionRepository = AppDataSource.getRepository(Version);

  async createVersion(data: Partial<Version>): Promise<Version> {

    const version = this.versionRepository.create(data);
    const response = await this.versionRepository.save(version)

    return response;
  }

  async getAllVersions(sortBy: string, sort: 'asc' | 'desc', modelId?: string): Promise<[Version[], number]> {
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
