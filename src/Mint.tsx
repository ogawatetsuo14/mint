import { useState } from 'react';
import { useWriteContract } from 'wagmi'
import { abi } from './wagmigotchiABI'
import { Address } from 'viem';

interface MintProps {
    cid: string,
    to: Address
}

function Mint({cid,to}:MintProps) {
  const { writeContract } = useWriteContract();
  const execMint = () => {
    //console.log(sender);
    writeContract({ 
      abi,
      address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      functionName: 'safeMint',
      args: [
        to as Address,
        cid,
      ],
   })
  }

  return (
    <div id="mint">
      <button onClick={execMint} >Mint</button>
    </div>
  )
}

export default Mint;