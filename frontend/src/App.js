import { Route, Routes } from 'react-router-dom';
import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  polygon,
  polygonMumbai
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Main from './pages/Main';
import Navbar from "./components/Navbar"
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ContractUpload from './pages/ContractUpload';

const { chains, publicClient } = configureChains(
  [polygonMumbai, polygon],
  [
    alchemyProvider({ apiKey: 'GWjHlCAyRQ-suLYu1DKVTUZ_BHr6-GXj' }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'inspecto',
  projectId: 'bfbb27d0b492e9f0b3362c364c5b93ee',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider coolMode chains={chains}>
          <Navbar />
          <Routes>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/contract-upload' element={<ContractUpload />} />
          </Routes>
          <Main/>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};