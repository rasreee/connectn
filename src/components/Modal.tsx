import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useClickOutside } from 'hooks/useClickOutside'
import { ReactNode, useRef } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
}

const SOverlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`

const SModal = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin: 15vh auto;
    min-height: 0px;
    max-width: 90vw;
    @media screen and (min-width: ${theme.breakpoints.sm}) {
      max-width: 46rem;
    }
  `,
  ({ theme }) => css`
    background: ${theme.bg.surface};
    border-radius: ${theme.radii.lg};
  `,
)

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(modalRef, () => onClose && onClose())

  if (!isOpen) return null

  return (
    <SOverlay>
      <SModal ref={modalRef}>{children}</SModal>
    </SOverlay>
  )
}
