import { ethers } from 'ethers';
import { lottoWinAbi } from './abi/lottowin';

export async function buyTicket(): Promise<any> {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      '0xC986F062Fc39223ab3D84DaB7494711CEbA349ea',
      lottoWinAbi,
      signer
    );
    
    await contract.buyTicket({ value: ethers.utils.parseEther('0.001') });
    
    return true;
  } catch (error) {
    console.error('Error in buyTicket:', error);
    throw error;
  }
}

export async function getTicketsByUser(address: any): Promise<any> {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://sepolia.optimism.io'
    );

    const contract = new ethers.Contract(
      '0xC986F062Fc39223ab3D84DaB7494711CEbA349ea',
      lottoWinAbi,
      provider
    );

    const tickets = await contract.getTicketsByUser(address);

    return tickets;
  } catch (error) {
    console.error('Error in buyTicket:', error);
    throw error;
  }
}
