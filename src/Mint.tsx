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
      address: '0xb66C9FdEf61a24e60B839037Fc786F944618eFAB', // Amoyコントラクトアドレス
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