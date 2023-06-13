import { ModalName } from 'components/modals'
import { makeAutoObservable } from 'mobx'

export class UiStore {
  modal: ModalName | null = null

  constructor() {
    makeAutoObservable(this, undefined, {
      name: 'UiStore',
      autoBind: true,
    })
  }

  showModal = (modal: ModalName) => {
    this.modal = modal
  }

  hideModal = () => {
    this.modal = null
  }
}
