import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor() { }
  public setItem = async (key: string, value: any) => {
    await Preferences.set({
      key,
      value: JSON.stringify(value)
    })
  }

  public getItem = async (key: string) => {
    const { value } = await Preferences.get({ key })
    return value ? JSON.parse(value) : null
  }

  public removeItem = async (key: string) => {
    await Preferences.remove({ key })
  }


}
