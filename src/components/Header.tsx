import { Home, HelpCircle, History, Ticket, X, Menu } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { LifecycleStatus } from '@coinbase/onchainkit/checkout';
import useCreateCharge from '../backend/coinbase/useCreateCharge';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<any>(null);
  const [balance, setBalance] = useState<string>('Fetching...');

  const navigation = [
    { name: 'Home', href: '#', icon: <Home className="w-5 h-5" /> },
    {
      name: 'How It Works',
      href: '#',
      icon: <HelpCircle className="w-5 h-5" />,
    },
    {
      name: 'Lottery History',
      href: '#',
      icon: <History className="w-5 h-5" />,
    },
    {
      name: 'My Tickets',
      href: '#',
      icon: <Ticket className="w-5 h-5" />,
    },
  ];

  const key = 0.1;

  const handleStatusChange = useCallback((status: LifecycleStatus) => {
    console.log('onStatus', status);
  }, []);

  const { createCharge } = useCreateCharge();

  const chargeHandler = useCallback(() => {
    const chargeDetails = {
      name: 'Lotto Win',
      description: 'Decentralized Lottery',
      pricing_type: 'fixed_price',
      local_price: {
        amount: key.toString(),
        currency: 'USD',
      },
    };
    return createCharge(chargeDetails);
  }, [createCharge]);

  const connectWallet = async () => {
    if (window?.ethereum) {
      try {
        // Request wallet connection
        const accounts = await window?.ethereum.request({
          method: 'eth_requestAccounts',
        });
        // Store the first account
        setWalletAddress(accounts[0]);
        console.log('Connected account:', accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const fetchBalance = useCallback(async (address: string) => {
    if (!address) {
      console.error('No wallet address connected');
      setBalance('No address connected');
      return;
    }

    const apiUrl = `https://optimism-sepolia.blockscout.com/api/v2/addresses/${address}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();

      const rawBalance = data?.coin_balance || 0;
      const balanceInEther = rawBalance / 1e18;
      const formattedBalance = balanceInEther.toFixed(6);

      setBalance(`${formattedBalance} ETH`);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('Error fetching balance');
    }
  }, []);

  useEffect(() => {
    const address = walletAddress;
    fetchBalance(address);
  }, [walletAddress]);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Ticket className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    {item.icon}
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={connectWallet}
            >
              {walletAddress
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : 'Connect Wallet'}
            </button>
            {/* <WalletComponents />
            <IdentityComponents />
            <Checkout
              key={key}
              onStatus={handleStatusChange}
              chargeHandler={chargeHandler}
            >
              <CheckoutButton
                coinbaseBranded={true}
                text="Pay with Crypto"
              />
            </Checkout> */}
            <button className="ml-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              {balance ? `Balance: ${balance}` : 'Fetching Balance...'}
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
              >
                {item.icon}
                {item.name}
              </a>
            ))}
            {/* <WalletComponents />
            <IdentityComponents />
            <Checkout
              key={key}
              onStatus={handleStatusChange}
              chargeHandler={chargeHandler}
            >
              <CheckoutButton
                coinbaseBranded={true}
                text="Pay with Crypto"
              />
            </Checkout> */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
