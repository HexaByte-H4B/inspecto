import { Navigate, Route, Routes } from 'react-router-dom';
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
import Home from './pages/Home';
import Navbar from "./components/Navbar"
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Contract from './pages/Contract';
import ContractUpload from './pages/ContractUpload';
import Anime from './pages/LandingPage';
import Profile from './pages/Profile';
import Test from './pages/Test';
import PageNotFound from './pages/PageNotFound';

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
            <Route exact path='/' element={<Anime />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/sign-in' element={<SignIn />} />
            <Route exact path='/sign-up' element={<SignUp />} />
            <Route exact path='/profile/:address' element={<Profile />} />
            <Route exact path='/contract/create' element={<ContractUpload />} />
            <Route exact path='/contract/:contractId' element={<Contract />} />
            <Route exact path='/test' element={<Test />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};