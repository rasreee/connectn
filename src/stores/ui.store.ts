import { Modals } from 'components/modals'
import { makeAutoObservable } from 'mobx'

export class UiStore {
  modal: Modals | null = null

  constructor() {
    makeAutoObservable(this)
  }

  openModal = (modal: Modals) => {
    this.modal = modal
  }

  closeModal = () => {
    this.modal = null
  }
}
