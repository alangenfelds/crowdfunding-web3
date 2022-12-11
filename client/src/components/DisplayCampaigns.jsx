import React from 'react';
import { useNavigate } from 'react-router-dom';

import { loader } from '../assets';
import FundCard from './FundCard';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate('/campaign-details/' + campaign.title, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-semibold text-lg text-left">
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {!isLoading && !campaigns.length && (
          <p className="font-semibold text-sm leading-[30px] text-[#818183]">
            You have not created any campaigns yet!
          </p>
        )}

        {!isLoading &&
          campaigns.length &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
