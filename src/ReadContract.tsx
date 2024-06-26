import { useReadContract } from 'wagmi'
import { abi } from "./wagmigotchiABI";
import { useAccount, useEnsName, useBalance } from 'wagmi'
 
function ReadContract() {
  const {address, isConnected} = useAccount();

  const contractRead = useReadContract({
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi,
    functionName: 'name',
    args: [],
  });

  const onClickButton = () => {
    contractRead.refetch();
    console.log(contractRead.status);
  };

  return (
    <>
    {isConnected && address}
    <button onClick={onClickButton}>Fetch</button>
    {contractRead.data}
    </>
  );
}

export default ReadContract;
