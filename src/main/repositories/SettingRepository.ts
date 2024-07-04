import { AppDataSource } from '../database';
import { Setting } from '../models/Setting';

export class SettingRepository {
  private settingRepository = AppDataSource.getRepository(Setting);

  async getSettingByKey(key: string): Promise<Setting | null> {
    return await this.settingRepository.findOne({
      where: { key },
    });
  }

  async saveSetting(setting: Setting): Promise<Setting> {
    return await this.settingRepository.save(setting);
  }
}
