/* eslint no-param-reassign: ["error", { "props": false }] */
import { percentageMask } from "./mask-util";

function clearDelimitersAndLeadingZeros(value) {
  const cleanValue = value
    .toString()
    .replace(/^-/, "")
    .replace(/^0*/, "");
  return cleanValue.replace(/[^0-9]/g, "");
}

function prepareNumberToFormatter(value, decimals) {
  return clearDelimitersAndLeadingZeros(parseFloat(value).toFixed(decimals));
}

export default function maskElement(element, vnode, casas) {
  const masker = percentageMask(casas);
  let inputValue = element.value;

  const isInitialized = element.dataset.percentageInitialized;
  if (!inputValue.includes("%") && isInitialized) {
    inputValue = inputValue.slice(0, inputValue.length - 1);
  }

  const cleanFn = isInitialized
    ? clearDelimitersAndLeadingZeros
    : prepareNumberToFormatter;

  inputValue = cleanFn(inputValue, casas) || "0";

  element.value = masker.apply(inputValue);

  if (!isInitialized) {
    element.dataset.percentageInitialized = true;
  }

  vnode.elm.dispatchEvent(
    new CustomEvent("input", {
      detail: {
        masked: true
      }
    })
  );
}
