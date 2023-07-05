import React, { ReactNode, RefObject, useEffect } from 'react';
import clsx from 'clsx';
import ReactFocusLock from 'react-focus-lock';
import { Code } from '../../consts/enums';

type ModalProps = {
  variant?: 'primary' | 'narrow';
  children: ReactNode;
  onClose: () => void;
  isOpened: boolean;
  contentRef: RefObject<HTMLDivElement>;
}

function Modal({ children, onClose, isOpened, contentRef, variant = 'primary' }: ModalProps) {
  const onEcsKeyDown = (evt: KeyboardEvent) => {
    if (evt.code === Code.Esc) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpened) {
      return;
    }

    contentRef.current?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = 'calc(17px - (100vw - 100%)';
    document.addEventListener('keydown', onEcsKeyDown);

    return () => {
      contentRef.current?.removeAttribute('inert');
      document.body.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      document.removeEventListener('keydown', onEcsKeyDown);
    };
  });

  return (
    <ReactFocusLock disabled={!isOpened} returnFocus>
      <div
        className={clsx('modal', isOpened && 'is-active', variant === 'narrow' && 'modal--narrow')}
      >
        <div
          onClick={onClose}
          className="modal__wrapper"
          data-testid="modal"
        >
          <div className="modal__overlay"></div>
          <div
            onClick={(evt) => evt.stopPropagation()}
            className="modal__content"
          >
            {children}
            <button
              onClick={onClose}
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default Modal;
