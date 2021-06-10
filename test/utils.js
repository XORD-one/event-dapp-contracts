const { BigNumber } = require("@ethersproject/bignumber");
const { time } = require("@openzeppelin/test-helpers");

function toWei(n) {
  return ethers.utils.parseEther(n);
}

function fromWei(n) {
  return n.div(BigNumber.from("1000000000000000000"));
}

function BnToString(n) {
  return ethers.utils.formatUnits(n, "ether");
}

function toBN(n) {
  return BigNumber.from(n);
}

async function etherBalance(addr) {
  return await ethers.provider.getBalance(addr);
}

async function increaseTimeInSec(n) {
  return await time.increase(time.duration.seconds(n));
}

async function increaseTimeInMin(n) {
  return await time.increase(time.duration.minutes(n));
}

async function timeToBN(n) {
  return toBN((await time.duration.hours(n)).toString());
}

async function currentTime() {
  return toBN((await time.latest()).toString());
}

async function toTimeFrmCurTime(n) {
  return (await currentTime()).add(await timeToBN(n));
}

module.exports = {
  toWei,
  fromWei,
  BnToString,
  toBN,
  etherBalance,
  increaseTimeInSec,
  increaseTimeInMin,
  timeToBN,
  currentTime,
  toTimeFrmCurTime,
};
