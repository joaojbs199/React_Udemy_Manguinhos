import { SetStorage } from '@/data/protocols/cache/set-storage'
import { SaveAccesToken } from '@/domain/useCases/save-access-token'

export class LocalSaveAccessToken implements SaveAccesToken {
  constructor (private readonly setStorage: SetStorage) {}

  async save (accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}
