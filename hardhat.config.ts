import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const INFURA_API_KEY = "458c5245c9c54543beaeaf0bb3d7399f";
const SEPOLIA_PRIVATE_KEY = "7d4ee972cc95f9e13fdbfa705ee60c7184cbee15bc9d58e875817ff372e49f92";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 88888
    },
    localhost: {
      url: `http://localhost:8545`,
      chainId: 88888
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};

export default config;


