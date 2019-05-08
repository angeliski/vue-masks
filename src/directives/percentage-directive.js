import maskElement from "@/core/percentage-masker";

export default {
  bind(el, bind, vnode) {
    const casas = bind.modifiers.integer ? 0 : bind.value || 2;

    const oninput = evt => {
      if (evt.detail && evt.detail.masked) return; // avoid infinite loop

      const element = evt.target;
      maskElement(element, vnode, casas);
    };

    maskElement(el, vnode, casas);
    el.addEventListener("input", oninput);
  }
};
