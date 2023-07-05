import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../types/app';
import { Camera } from '../../types/camera';

function AddItemButton({ camera }: { camera: Camera }) {
  const { setPreviewDisplay } = useOutletContext<OutletContext>();


  return (
    <button
      onClick={() => setPreviewDisplay({ camera, isModalOpened: true })}
      className="btn btn--purple"
      type="button"
    >
      <svg width="24" height="16" aria-hidden="true">
        <use xlinkHref="#icon-add-basket"></use>
      </svg>
      Добавить в корзину
    </button>
  );
}

export default AddItemButton;
