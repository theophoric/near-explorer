import BN from "bn.js";

interface Props {
  gas: BN;
}

const MGAS = new BN(10 ** 6);
const GGAS = new BN(1024).mul(MGAS);
export const TGAS = new BN(10 ** 12);

export default ({ gas }: Props) => {
  let gasShow;
  if (gas.gte(TGAS)) {
    gasShow = `${gas.div(GGAS).toString()} Tgas`;
  } else if (gas.gte(GGAS)) {
    gasShow = `${gas.div(GGAS).toString()} Ggas`;
  } else if (gas.gte(MGAS)) {
    gasShow = `${gas.div(MGAS).toString()} Mgas`;
  } else {
    gasShow = `${gas.toString()} gas`;
  }
  return <>{gasShow}</>;
};
