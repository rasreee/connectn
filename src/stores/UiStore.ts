import { action, makeObservable, observable } from 'mobx';

export class UiStore {
  @observable
  isSettingsOpen = false;

  constructor() {
    makeObservable(this);
  }

  @action
  setSettingsOpen = (value: boolean) => (this.isSettingsOpen = value);
}
