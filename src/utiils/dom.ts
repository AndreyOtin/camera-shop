const disableInteractiveElements = (modal: HTMLDivElement) => {
  const selectors = ['a', 'button', 'input', 'textarea', '[tabindex]'];
  const interactiveElements: Element[] = [];

  const elements = document.querySelectorAll(selectors.toString());

  elements.forEach((element) => {
    if (modal.contains(element)) {
      return;
    }

    if (element.getAttribute('tabindex') !== '-1') {
      element.setAttribute('tabindex', '-1');
      interactiveElements.push(element);
    }
  });

  return () => {
    while (interactiveElements.length) {
      interactiveElements.pop()?.setAttribute('tabindex', '0');
    }
  };
};

export { disableInteractiveElements };
