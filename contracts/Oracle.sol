// File: @uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol
pragma solidity >=0.5.0;

interface IUniswapV2Factory {
    event PairCreated(
        address indexed token0,
        address indexed token1,
        address pair,
        uint256
    );

    function feeTo() external view returns (address);

    function feeToSetter() external view returns (address);

    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair);

    function allPairs(uint256) external view returns (address pair);

    function allPairsLength() external view returns (uint256);

    function createPair(address tokenA, address tokenB)
        external
        returns (address pair);

    function setFeeTo(address) external;

    function setFeeToSetter(address) external;
}

// File: @uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol
pragma solidity >=0.5.0;

interface IUniswapV2Pair {
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external pure returns (string memory);

    function symbol() external pure returns (string memory);

    function decimals() external pure returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);

    function PERMIT_TYPEHASH() external pure returns (bytes32);

    function nonces(address owner) external view returns (uint256);

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Burn(
        address indexed sender,
        uint256 amount0,
        uint256 amount1,
        address indexed to
    );
    event Swap(
        address indexed sender,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint256);

    function factory() external view returns (address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves()
        external
        view
        returns (
            uint112 reserve0,
            uint112 reserve1,
            uint32 blockTimestampLast
        );

    function price0CumulativeLast() external view returns (uint256);

    function price1CumulativeLast() external view returns (uint256);

    function kLast() external view returns (uint256);

    function mint(address to) external returns (uint256 liquidity);

    function burn(address to)
        external
        returns (uint256 amount0, uint256 amount1);

    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes calldata data
    ) external;

    function skim(address to) external;

    function sync() external;

    function initialize(address, address) external;
}

// File: @uniswap/v2-periphery/contracts/libraries/UniswapV2OracleLibrary.sol
pragma solidity >=0.5.0;

// library with helper methods for oracles that are concerned with computing average prices
library UniswapV2OracleLibrary {
    using FixedPoint for *;

    // helper function that returns the current block timestamp within the range of uint32, i.e. [0, 2**32 - 1]
    function currentBlockTimestamp() internal view returns (uint32) {
        return uint32(block.timestamp % 2**32);
    }

    // produces the cumulative price using counterfactuals to save gas and avoid a call to sync.
    function currentCumulativePrices(address pair)
        internal
        view
        returns (
            uint256 price0Cumulative,
            uint256 price1Cumulative,
            uint32 blockTimestamp
        )
    {
        blockTimestamp = currentBlockTimestamp();
        price0Cumulative = IUniswapV2Pair(pair).price0CumulativeLast();
        price1Cumulative = IUniswapV2Pair(pair).price1CumulativeLast();

        // if time has elapsed since the last update on the pair, mock the accumulated price values
        (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast) =
            IUniswapV2Pair(pair).getReserves();
        if (blockTimestampLast != blockTimestamp) {
            // subtraction overflow is desired
            uint32 timeElapsed = blockTimestamp - blockTimestampLast;
            // addition overflow is desired
            // counterfactual
            price0Cumulative +=
                uint256(FixedPoint.fraction(reserve1, reserve0)._x) *
                timeElapsed;
            // counterfactual
            price1Cumulative +=
                uint256(FixedPoint.fraction(reserve0, reserve1)._x) *
                timeElapsed;
        }
    }
}

// File: @uniswap/lib/contracts/libraries/BitMath.sol
pragma solidity >=0.5.0;

library BitMath {
    // returns the 0 indexed position of the most significant bit of the input x
    // s.t. x >= 2**msb and x < 2**(msb+1)
    function mostSignificantBit(uint256 x) internal pure returns (uint8 r) {
        require(x > 0, "BitMath::mostSignificantBit: zero");

        if (x >= 0x100000000000000000000000000000000) {
            x >>= 128;
            r += 128;
        }
        if (x >= 0x10000000000000000) {
            x >>= 64;
            r += 64;
        }
        if (x >= 0x100000000) {
            x >>= 32;
            r += 32;
        }
        if (x >= 0x10000) {
            x >>= 16;
            r += 16;
        }
        if (x >= 0x100) {
            x >>= 8;
            r += 8;
        }
        if (x >= 0x10) {
            x >>= 4;
            r += 4;
        }
        if (x >= 0x4) {
            x >>= 2;
            r += 2;
        }
        if (x >= 0x2) r += 1;
    }

    // returns the 0 indexed position of the least significant bit of the input x
    // s.t. (x & 2**lsb) != 0 and (x & (2**(lsb) - 1)) == 0)
    // i.e. the bit at the index is set and the mask of all lower bits is 0
    function leastSignificantBit(uint256 x) internal pure returns (uint8 r) {
        require(x > 0, "BitMath::leastSignificantBit: zero");

        r = 255;
        if (x & uint128(int128(-1)) > 0) {
            r -= 128;
        } else {
            x >>= 128;
        }
        if (x & uint64(int64(-1)) > 0) {
            r -= 64;
        } else {
            x >>= 64;
        }
        if (x & uint32(int32(-1)) > 0) {
            r -= 32;
        } else {
            x >>= 32;
        }
        if (x & uint16(int16(-1)) > 0) {
            r -= 16;
        } else {
            x >>= 16;
        }
        if (x & uint8(int8(-1)) > 0) {
            r -= 8;
        } else {
            x >>= 8;
        }
        if (x & 0xf > 0) {
            r -= 4;
        } else {
            x >>= 4;
        }
        if (x & 0x3 > 0) {
            r -= 2;
        } else {
            x >>= 2;
        }
        if (x & 0x1 > 0) r -= 1;
    }
}

// File: @uniswap/lib/contracts/libraries/Babylonian.sol
pragma solidity >=0.4.0;

// computes square roots using the babylonian method
// https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method
library Babylonian {
    // credit for this implementation goes to
    // https://github.com/abdk-consulting/abdk-libraries-solidity/blob/master/ABDKMath64x64.sol#L687
    function sqrt(uint256 x) internal pure returns (uint256) {
        if (x == 0) return 0;
        // this block is equivalent to r = uint256(1) << (BitMath.mostSignificantBit(x) / 2);
        // however that code costs significantly more gas
        uint256 xx = x;
        uint256 r = 1;
        if (xx >= 0x100000000000000000000000000000000) {
            xx >>= 128;
            r <<= 64;
        }
        if (xx >= 0x10000000000000000) {
            xx >>= 64;
            r <<= 32;
        }
        if (xx >= 0x100000000) {
            xx >>= 32;
            r <<= 16;
        }
        if (xx >= 0x10000) {
            xx >>= 16;
            r <<= 8;
        }
        if (xx >= 0x100) {
            xx >>= 8;
            r <<= 4;
        }
        if (xx >= 0x10) {
            xx >>= 4;
            r <<= 2;
        }
        if (xx >= 0x8) {
            r <<= 1;
        }
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1; // Seven iterations should be enough
        uint256 r1 = x / r;
        return (r < r1 ? r : r1);
    }
}

// File: @uniswap/lib/contracts/libraries/FullMath.sol
pragma solidity >=0.4.0;

// taken from https://medium.com/coinmonks/math-in-solidity-part-3-percents-and-proportions-4db014e080b1
// license is CC-BY-4.0
library FullMath {
    function fullMul(uint256 x, uint256 y)
        internal
        pure
        returns (uint256 l, uint256 h)
    {
        uint256 mm = mulmod(x, y, uint256(int256(-1)));
        l = x * y;
        h = mm - l;
        if (mm < l) h -= 1;
    }

    function fullDiv(
        uint256 l,
        uint256 h,
        uint256 d
    ) private pure returns (uint256) {
        uint256 pow2 = d & (type(uint256).max - d + 1);
        d /= pow2;
        l /= pow2;
        l += h * ((type(uint256).max - pow2 + 1) / pow2 + 1);
        uint256 r = 1;
        r *= 2 - d * r;
        r *= 2 - d * r;
        r *= 2 - d * r;
        r *= 2 - d * r;
        r *= 2 - d * r;
        r *= 2 - d * r;
        r *= 2 - d * r;
        r *= 2 - d * r;
        return l * r;
    }

    function mulDiv(
        uint256 x,
        uint256 y,
        uint256 d
    ) internal pure returns (uint256) {
        (uint256 l, uint256 h) = fullMul(x, y);

        uint256 mm = mulmod(x, y, d);
        if (mm > l) h -= 1;
        l -= mm;

        if (h == 0) return l / d;

        require(h < d, "FullMath: FULLDIV_OVERFLOW");
        return fullDiv(l, h, d);
    }
}

// File: @uniswap/lib/contracts/libraries/FixedPoint.sol
pragma solidity >=0.4.0;

// a library for handling binary fixed point numbers (https://en.wikipedia.org/wiki/Q_(number_format))
library FixedPoint {
    // range: [0, 2**112 - 1]
    // resolution: 1 / 2**112
    struct uq112x112 {
        uint224 _x;
    }

    // range: [0, 2**144 - 1]
    // resolution: 1 / 2**112
    struct uq144x112 {
        uint256 _x;
    }

    uint8 public constant RESOLUTION = 112;
    uint256 public constant Q112 = 0x10000000000000000000000000000; // 2**112
    uint256 private constant Q224 =
        0x100000000000000000000000000000000000000000000000000000000; // 2**224
    uint256 private constant LOWER_MASK = 0xffffffffffffffffffffffffffff; // decimal of UQ*x112 (lower 112 bits)

    // encode a uint112 as a UQ112x112
    function encode(uint112 x) internal pure returns (uq112x112 memory) {
        return uq112x112(uint224(x) << RESOLUTION);
    }

    // encodes a uint144 as a UQ144x112
    function encode144(uint144 x) internal pure returns (uq144x112 memory) {
        return uq144x112(uint256(x) << RESOLUTION);
    }

    // decode a UQ112x112 into a uint112 by truncating after the radix point
    function decode(uq112x112 memory self) internal pure returns (uint112) {
        return uint112(self._x >> RESOLUTION);
    }

    // decode a UQ144x112 into a uint144 by truncating after the radix point
    function decode144(uq144x112 memory self) internal pure returns (uint144) {
        return uint144(self._x >> RESOLUTION);
    }

    // multiply a UQ112x112 by a uint, returning a UQ144x112
    // reverts on overflow
    function mul(uq112x112 memory self, uint256 y)
        internal
        pure
        returns (uq144x112 memory)
    {
        uint256 z = 0;
        require(
            y == 0 || (z = self._x * y) / y == self._x,
            "FixedPoint::mul: overflow"
        );
        return uq144x112(z);
    }

    // multiply a UQ112x112 by an int and decode, returning an int
    // reverts on overflow
    function muli(uq112x112 memory self, int256 y)
        internal
        pure
        returns (int256)
    {
        uint256 z = FullMath.mulDiv(self._x, uint256(y < 0 ? -y : y), Q112);
        require(z < 2**255, "FixedPoint::muli: overflow");
        return y < 0 ? -int256(z) : int256(z);
    }

    // multiply a UQ112x112 by a UQ112x112, returning a UQ112x112
    // lossy
    function muluq(uq112x112 memory self, uq112x112 memory other)
        internal
        pure
        returns (uq112x112 memory)
    {
        if (self._x == 0 || other._x == 0) {
            return uq112x112(0);
        }
        uint112 upper_self = uint112(self._x >> RESOLUTION); // * 2^0
        uint112 lower_self = uint112(self._x & LOWER_MASK); // * 2^-112
        uint112 upper_other = uint112(other._x >> RESOLUTION); // * 2^0
        uint112 lower_other = uint112(other._x & LOWER_MASK); // * 2^-112

        // partial products
        uint224 upper = uint224(upper_self) * upper_other; // * 2^0
        uint224 lower = uint224(lower_self) * lower_other; // * 2^-224
        uint224 uppers_lowero = uint224(upper_self) * lower_other; // * 2^-112
        uint224 uppero_lowers = uint224(upper_other) * lower_self; // * 2^-112

        // so the bit shift does not overflow
        require(
            upper <= uint112(int112(-1)),
            "FixedPoint::muluq: upper overflow"
        );

        // this cannot exceed 256 bits, all values are 224 bits
        uint256 sum =
            uint256(upper << RESOLUTION) +
                uppers_lowero +
                uppero_lowers +
                (lower >> RESOLUTION);

        // so the cast does not overflow
        require(sum <= uint112(int112(-1)), "FixedPoint::muluq: sum overflow");

        return uq112x112(uint224(sum));
    }

    // divide a UQ112x112 by a UQ112x112, returning a UQ112x112
    function divuq(uq112x112 memory self, uq112x112 memory other)
        internal
        pure
        returns (uq112x112 memory)
    {
        require(other._x > 0, "FixedPoint::divuq: division by zero");
        if (self._x == other._x) {
            return uq112x112(uint224(Q112));
        }
        if (self._x <= uint112(int112(-1))) {
            uint256 value = (uint256(self._x) << RESOLUTION) / other._x;
            require(
                value <= uint224(int224(-1)),
                "FixedPoint::divuq: overflow"
            );
            return uq112x112(uint224(value));
        }

        uint256 result = FullMath.mulDiv(Q112, self._x, other._x);
        require(result <= uint224(int224(-1)), "FixedPoint::divuq: overflow");
        return uq112x112(uint224(result));
    }

    // returns a UQ112x112 which represents the ratio of the numerator to the denominator
    // can be lossy
    function fraction(uint256 numerator, uint256 denominator)
        internal
        pure
        returns (uq112x112 memory)
    {
        require(denominator > 0, "FixedPoint::fraction: division by zero");
        if (numerator == 0) return FixedPoint.uq112x112(0);

        if (numerator <= uint144(int144(-1))) {
            uint256 result = (numerator << RESOLUTION) / denominator;
            require(
                result <= uint224(int224(-1)),
                "FixedPoint::fraction: overflow"
            );
            return uq112x112(uint224(result));
        } else {
            uint256 result = FullMath.mulDiv(numerator, Q112, denominator);
            require(
                result <= uint224(int224(-1)),
                "FixedPoint::fraction: overflow"
            );
            return uq112x112(uint224(result));
        }
    }

    // take the reciprocal of a UQ112x112
    // reverts on overflow
    // lossy
    function reciprocal(uq112x112 memory self)
        internal
        pure
        returns (uq112x112 memory)
    {
        require(self._x != 0, "FixedPoint::reciprocal: reciprocal of zero");
        require(self._x != 1, "FixedPoint::reciprocal: overflow");
        return uq112x112(uint224(Q224 / self._x));
    }

    // square root of a UQ112x112
    // lossy between 0/1 and 40 bits
    function sqrt(uq112x112 memory self)
        internal
        pure
        returns (uq112x112 memory)
    {
        if (self._x <= uint144(int144(-1))) {
            return uq112x112(uint224(Babylonian.sqrt(uint256(self._x) << 112)));
        }

        uint8 safeShiftBits = 255 - BitMath.mostSignificantBit(self._x);
        safeShiftBits -= safeShiftBits % 2;
        return
            uq112x112(
                uint224(
                    Babylonian.sqrt(uint256(self._x) << safeShiftBits) <<
                        ((112 - safeShiftBits) / 2)
                )
            );
    }
}

// File: contracts/Oracle.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

interface IERC20 {
    function decimals() external view returns (uint8);
}

// rinkeby
contract Oracle {
    using FixedPoint for *;
    address public constant MATIC = 0xc778417E063141139Fce010982780140Aa0cD5Ab; // WETH
    address public constant PHNX = 0xfe1b6ABc39E46cEc54d275efB4b29B33be176c2A; // PHNX
    address public constant UNISWAP_V2_FACTORY =
        0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    IUniswapV2Factory factoryInterface;

    mapping(address => uint256) public cummulativeAveragePrice;
    mapping(address => uint256) public cummulativeEthPrice;
    mapping(address => uint32) public tokenToTimestampLast;
    mapping(address => uint256) public cummulativeAveragePriceReserve;
    mapping(address => uint256) public cummulativeEthPriceReserve;
    mapping(address => uint32) public lastTokenTimestamp;

    event AssetValue(uint256, uint256);

    constructor() {
        factoryInterface = IUniswapV2Factory(UNISWAP_V2_FACTORY);
        setValues(PHNX);
    }

    function setValues(address token) public {
        address pool = factoryInterface.getPair(MATIC, token);
        if (pool != address(0)) {
            if (MATIC < token) {
                (
                    cummulativeEthPrice[token],
                    cummulativeAveragePrice[token],
                    tokenToTimestampLast[token]
                ) = UniswapV2OracleLibrary.currentCumulativePrices(
                    address(pool)
                );
                cummulativeAveragePriceReserve[token] = IUniswapV2Pair(pool)
                    .price0CumulativeLast();
                cummulativeEthPriceReserve[token] = IUniswapV2Pair(pool)
                    .price1CumulativeLast();
            } else {
                (
                    cummulativeAveragePrice[token],
                    cummulativeEthPrice[token],
                    tokenToTimestampLast[token]
                ) = UniswapV2OracleLibrary.currentCumulativePrices(
                    address(pool)
                );
                cummulativeAveragePriceReserve[token] = IUniswapV2Pair(pool)
                    .price1CumulativeLast();
                cummulativeEthPriceReserve[token] = IUniswapV2Pair(pool)
                    .price0CumulativeLast();
            }
            lastTokenTimestamp[token] = uint32(block.timestamp);
        }
    }

    function fetch(address token, bytes calldata)
        external
        returns (uint256 price)
    {
        uint32 _blockTimestamp = uint32(block.timestamp);
        if (
            cummulativeAveragePrice[token] == 0 ||
            (_blockTimestamp - lastTokenTimestamp[token]) >= 30 minutes
        ) {
            setValues(token);
        }
        uint256 maticPerPhnx = _getAmounts(PHNX);
        emit AssetValue(maticPerPhnx, block.timestamp);

        uint256 maticPerToken = _getAmounts(token);

        emit AssetValue(maticPerToken, _blockTimestamp);

        if (maticPerToken == 0 || maticPerPhnx == 0) return 0;

        price = (maticPerToken * (1e18)) / (maticPerPhnx);
        emit AssetValue(price, _blockTimestamp);
    }

    // PHNXperMATIC
    function fetchAquaPrice() external returns (uint256 price) {
        uint32 _blockTimestamp = uint32(block.timestamp);
        if (
            cummulativeAveragePrice[PHNX] == 0 ||
            (_blockTimestamp - lastTokenTimestamp[PHNX]) >= 30 minutes
        ) {
            setValues(PHNX);
        }
        uint32 timeElapsed =
            lastTokenTimestamp[PHNX] - tokenToTimestampLast[PHNX];
        price = _calculate(
            cummulativeEthPrice[PHNX],
            cummulativeAveragePriceReserve[PHNX],
            timeElapsed,
            PHNX
        );
        emit AssetValue(price, _blockTimestamp);
    }

    function _getAmounts(address token)
        internal
        view
        returns (uint256 maticPerToken)
    {
        address poolAddress = factoryInterface.getPair(MATIC, token);
        if (poolAddress == address(0)) return 0;
        uint32 timeElapsed =
            lastTokenTimestamp[token] - tokenToTimestampLast[token];
        maticPerToken = _calculate(
            cummulativeAveragePrice[token],
            cummulativeEthPriceReserve[token],
            timeElapsed,
            token
        );
    }

    function _calculate(
        uint256 latestCommulative,
        uint256 oldCommulative,
        uint32 timeElapsed,
        address token
    ) public view returns (uint256 assetValue) {
        FixedPoint.uq112x112 memory priceTemp =
            FixedPoint.uq112x112(
                uint224((latestCommulative - (oldCommulative)) / (timeElapsed))
            );
        uint8 decimals = IERC20(token).decimals();
        // Maybe check if deciamls not 18. Or rather not add those pairs in protocol.
        assetValue = priceTemp.mul(10**decimals).decode144();
    }
}
