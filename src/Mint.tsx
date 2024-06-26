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
      address: '0xcc2B179cA62C6A9aeD3EC776d4d4dd610e00D229', // Amoyコントラクトアドレス
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