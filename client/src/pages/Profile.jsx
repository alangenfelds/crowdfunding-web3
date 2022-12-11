import React, { useState, useEffect } from 'react';
import DisplayCampaigns from '../components/DisplayCampaigns';

import { useAppContext } from '../context';

const Profile = () => {
  const { address, contract, getUserCampaigns } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    setIsLoading(true);

    const data = await getUserCampaigns();

    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="My Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
