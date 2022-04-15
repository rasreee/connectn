import { Maybe } from 'lib/types'
import { makeAutoObservable } from 'mobx'

export const ModalKey = {
  NewGame: 'NewGame',
  Settings: 'Settings',
} as const

export type ModalKeyType = keyof typeof ModalKey

export class UiStore {
  modalToShow: Maybe<ModalKeyType> = null

  constructor() {
    makeAutoObservable(this)
  }

  openModal = (modalToShow: ModalKeyType) => {
    this.modalToShow = modalToShow
  }

  closeModal = () => {
    this.modalToShow = null
  }
}
