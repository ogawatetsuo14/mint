import { useState } from "react";
import './IpfsUpload.css';
import Mint from "./Mint";
import { useAccount, useEnsName, useBalance } from 'wagmi'

type Profile = {
  name: string; 
  description: string;
  image: string;
  attributes: [
    {
      value: number;
    }
  ]
};

function IpfsUpload() {
  const [result,setResult]: any = useState();
  const [selectedImage, setSelectedImage]: any = useState();
  let inputData:Profile;
  const [description, setDescription]: any = useState();
  const [name, setName]: any = useState();
  const [senderAddress, setSenderAddress]: any = useState();
  const {address, isConnected} = useAccount();
  
  const changeImageHandler = (event: any) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      const metadata = JSON.stringify({
        name: name,
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      console.log(resData);
      console.log(resData.IpfsHash)
      inputData = {
        "name": name,
        "description": description,
        "image": "https://ipfs.io/ipfs/"+resData.IpfsHash,
        "attributes": [
            {
                "value":10
            }
        ]
      };
      uploadJSON();
    } catch (error) {
      console.log(error);
      setResult("Failed: " + error);
    }
  };

  const uploadJSON = async () => {
    console.log("upload execute!!");
    console.log(inputData);
    try {
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: JSON.stringify(inputData),
        }
      );
      const resData = await res.json();
      console.log(resData);
      console.log(resData.IpfsHash);
      console.log("Symbol is ");
      setResult("IPFS CID: " + resData.IpfsHash);
    } catch (error) {
      console.log(error);
      setResult("Failed: " + error);
    }
  };

  let mint;
  if (result){
    mint = <Mint cid={result} to={senderAddress} />
    setTimeout(()=>{
      setName('');
      setDescription('');
      setSenderAddress('');
      setResult('');
    },30000);
  }

  return (
    <div id="ipfs">
      <h1>Mint</h1>
      <label className="form-label">Name:
        <input type="text" onChange={e=>setName(e.target.value)} value={name} />
      </label>
      <label className="form-label">Description:
        <input type="text" onChange={e=>setDescription(e.target.value)} value={description}/>
      </label>
      <label className="form-label">To Address:
        <input type="text" onChange={e=>setSenderAddress(e.target.value)} value={senderAddress} />
      </label>
      <label className="form-label">From Address:{isConnected && address}</label>
      <label className="form-label"> Choose File
        <input type="file" onChange={changeImageHandler} />
      </label>
      <div id="other">
        <button onClick={handleSubmission}>Submit</button>
        {result}
      </div>
      {mint}
    </div>
  );
}

export default IpfsUpload;
