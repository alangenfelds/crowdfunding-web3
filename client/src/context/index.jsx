import React, { useContext, createContext } from 'react';

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react';

import { ethers } from 'ethers';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { contract } = useContract(
    '0x83daB428C8Af158B436846DDC1a3f07664e2b8F4'
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    'createCampaign'
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);

      console.log('Contract call success!', data);
    } catch (error) {
      console.log('Contract call failed!', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        address,
        connect,
        contract,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
