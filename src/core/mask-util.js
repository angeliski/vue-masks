import StringMask from "string-mask";

function getPatternToNumberMask(
  thousandsDelimiter,
  decimals,
  decimalDelimiter
) {
  let mask = `#${thousandsDelimiter}##0`;

  if (decimals > 0) {
    mask += decimalDelimiter;
    for (let i = 0; i < decimals; i += 1) {
      mask += "0";
    }
  }
  return mask;
}

function build(mask, reverse) {
  return new StringMask(mask, {
    reverse: reverse
  });
}

function percentageMask(
  decimals,
  decimalDelimiter = ",",
  thousandsDelimiter = "."
) {
  const mask = `${getPatternToNumberMask(
    thousandsDelimiter,
    decimals,
    decimalDelimiter
  )}%`;
  return build(mask, true);
}

function numberMask(
  decimals,
  decimalDelimiter = ",",
  thousandsDelimiter = "."
) {
  const mask = getPatternToNumberMask(
    thousandsDelimiter,
    decimals,
    decimalDelimiter
  );
  return build(mask, true);
}

export { percentageMask, numberMask };
