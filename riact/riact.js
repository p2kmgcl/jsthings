let currentState;
let reRender;

export function useState(initialState) {
  if (!currentState) {
    currentState = initialState;
  }

  const setState = (nextState) => {
    currentState = nextState;
    reRender();
  };

  return [currentState, setState];
}

const render = (jsx, wrapper) => {
  let jsxArray = jsx;

  if (!Array.isArray(jsxArray)) {
    jsxArray = [jsx];
  }

  jsxArray.forEach((element) => {
    const domNode = document.createElement(element.tagName);
    wrapper.appendChild(domNode);

    Object.entries(element.props).forEach((entry) => {
      const [key, value] = entry;

      if (typeof value === "function") {
        domNode.addEventListener(key, value);
      } else {
        domNode.setAttribute(key, value);
      }
    });

    if (element.ref) {
      element.ref.current = domNode;
    }

    if (element.children) {
      if (Array.isArray(element.children)) {
        element.children.forEach((child) => {
          render(child, domNode);
        });
      } else {
        domNode.innerText = element.children;
      }
    }
  });
};

export const Riact = (Component, wrapper) => {
  reRender = () => {
    wrapper.innerHTML = "";
    render(Component(), wrapper);
  };

  reRender();
};
