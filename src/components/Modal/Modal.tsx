import { XIcon } from 'components/Modal/XIcon';
import { useClickOutside } from 'hooks/useClickOutside';
import { ReactNode, useRef } from 'react';

import styles from './Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        {children}
      </div>
    </div>
  );
}

Modal.Header = ({ title, onClose }: { title: string; onClose: () => void }) => {
  return (
    <div className={styles.header}>
      <h4>{title}</h4>
      <button className='button button-circular' onClick={onClose}>
        <XIcon />
      </button>
    </div>
  );
};
