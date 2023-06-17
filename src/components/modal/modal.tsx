import React, { ReactNode, RefObject, useEffect } from 'react';
import clsx from 'clsx';
import ReactFocusLock from 'react-focus-lock';

type ModalProps = {
  children: ReactNode;
  onClickOutside: () => void;
  isOpened?: boolean;
  contentRef: RefObject<HTMLDivElement>;
}

function Modal({ children, onClickOutside, isOpened, contentRef }: ModalProps) {
  const onEcsKeyDown = (evt: KeyboardEvent) => {
    if (evt.code === 'Escape') {
      onClickOutside();
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
        className={clsx('modal', isOpened && 'is-active')}
      >
        <div
          onClick={onClickOutside}
          className="modal__wrapper"
          data-testid="modal"
        >
          <div className="modal__overlay"></div>
          <div
            onClick={(evt) => evt.stopPropagation()}
            className="modal__content"
          >
            {children}
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default Modal;
