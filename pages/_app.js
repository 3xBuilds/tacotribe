import './globals.css'

import Layout from '../components/layout'

import '@rainbow-me/rainbowkit/styles.css';

import { SessionProvider } from "next-auth/react"
import { WagmiConfig, createConfig, configureChains } from "wagmi"
import { polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from "wagmi/providers/public"
import { RainbowKitSiweNextAuthProvider, } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const { chains, publicClient } = configureChains(
    [polygon],
    [
        alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
        publicProvider()
    ]
)

const { connectors } = getDefaultWallets({
    appName: 'Taco Tribe',
    projectId: '985f5484d06e5c6739931f20592e63f8',
    chains
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})

const getSiweMessageOptions = () => ({
    statement: 'Sign in to Taco Tribe',
});


export default function App({ Component, pageProps }) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <RainbowKitSiweNextAuthProvider
                    getSiweMessageOptions={getSiweMessageOptions}>
                    <RainbowKitProvider chains={chains}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </RainbowKitProvider>
                </RainbowKitSiweNextAuthProvider>
            </SessionProvider>
        </WagmiConfig>
    );
}