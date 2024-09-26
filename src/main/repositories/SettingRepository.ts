import { validate } from 'class-validator';
import { AppDataSource } from '../database';
import { Setting } from '../models/Setting';

export class SettingRepository {
  private settingRepository = AppDataSource.getRepository(Setting);

  /**
   * get setting
   */
  async getSettingByKey(key: string): Promise<Setting | null> {
    return await this.settingRepository.findOne({
      where: { key },
    });
  }

  /**
   * set setting
   */
  async saveSetting(setting: Setting): Promise<Setting> {
    const validationErrors = await validate(setting);

    if (validationErrors.length > 0) {
      console.error('Validation failed:', validationErrors);
      throw new Error('Validation failed');
    }

    return await this.settingRepository.save(setting);
  }
}
