import { RefObject, useEffect, useRef } from 'react';
import { Code } from '../consts/enums';

type InputRef = RefObject<HTMLInputElement>;
type LinkContainerRef = RefObject<Element>;

function UseArrowNavigation(inputRef: InputRef, linkContainerRef: LinkContainerRef) {
  const activeLink = useRef(-1);

  useEffect(() => {
    const pressedKeys = new Set();

    const onKeyUp = (evt: globalThis.KeyboardEvent) => {
      pressedKeys.delete(evt.code);
    };

    const onKeyDown = (evt: globalThis.KeyboardEvent) => {
      pressedKeys.add(evt.code);

      if (!document.activeElement) {
        return;
      }

      if (!linkContainerRef.current) {
        return;
      }

      const areUpCodes = (pressedKeys.has(Code.Tab) && pressedKeys.has(Code.ShiftLeft)) || pressedKeys.has(Code.ArrowUp);
      const areDownCodes = (pressedKeys.has(Code.Tab) && !pressedKeys.has(Code.ShiftLeft)) || pressedKeys.has(Code.ArrowDown);
      const isSearchInput = areUpCodes && activeLink.current === 0;

      const isNextElement = (linkContainerRef.current.contains(document.activeElement.nextElementSibling) ||
        document.activeElement === inputRef.current);
      const isPrevElement = (linkContainerRef.current.contains(document.activeElement.previousElementSibling) ||
        document.activeElement === inputRef.current);

      const isUp =
        areUpCodes &&
        isPrevElement &&
        activeLink.current > 0;

      const isDown =
        areDownCodes &&
        isNextElement &&
        activeLink.current < linkContainerRef.current.children.length - 1;

      if (isUp) {
        evt.preventDefault();
        --activeLink.current;
        const element = linkContainerRef.current.children[activeLink.current] as HTMLAnchorElement;
        element.focus();
        return;
      }

      if (isDown) {
        evt.preventDefault();
        ++activeLink.current;
        const element = linkContainerRef.current.children[activeLink.current] as HTMLAnchorElement;
        element.focus();
        return;
      }

      if (isSearchInput) {
        evt.preventDefault();
        activeLink.current = -1;
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  });

  return () => {
    activeLink.current = -1;
  };
}

export default UseArrowNavigation;
