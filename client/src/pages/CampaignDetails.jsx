import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';

import { useAppContext } from '../context';
import { CountBox, CustomButton } from '../components';

import { calculateBarPercentage, daysLeft } from '../utils';

import { thirdweb } from '../assets';

const CampaignDetails = () => {
  const { state } = useLocation();
  const { getDonations, contract, address } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <div className="w-full flex flex-col md:flex-row mt-10 gap-[30px]">
            <div className="flex-1 flex-col">
              <img
                src={state.image}
                alt="campaign"
                className="w-full h-[410px] object-cover rounded-xl"
              />
              <div className="relative w-full h-[5px] bg-[#3a3a43]">
                <div
                  className="absolute h-full bg-[#4acd8d]"
                  style={{
                    width: `${calculateBarPercentage(
                      state.target,
                      state.amountCollected
                    )}%`,
                    maxWidth: '100%',
                  }}
                />
              </div>
            </div>

            <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
              <CountBox title="Days Left" value={remainingDays} />
              <CountBox
                title={`Raised of ${state.target}`}
                value={state.amountCollected}
              />
              <CountBox title="Total Backers" value={donators.length} />
            </div>
          </div>

          <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
              <div>
                <h4 className="font-semibold text-[18px]  uppercase">
                  Creator
                </h4>

                <div className="mt-[20px] flex items-center flex-wrap gap-[14px]">
                  <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <img
                      src={thirdweb}
                      alt="user"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm break-all">
                      {state.owner}
                    </h4>
                    <p className="mt-1 text-xs text-[#808191]">10 Campaigns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
              <div>
                <h4 className="font-semibold text-[18px] uppercase">Story</h4>

                <div className="mt-[20px]">
                  <p className="text-[#808191] leading-[26px] text-justify">
                    {state.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
              <div>
                <h4 className="font-semibold text-[18px] uppercase">
                  Donators
                </h4>

                <div className="mt-[20px] flex flex-col gap-4">
                  {donators.length ? (
                    donators.map((donator, idx) => <div key={idx}>Donator</div>)
                  ) : (
                    <p className="text-[#808191] leading-[26px] text-justify">
                      No donators yet. Be the first one!
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h4 className="font-semibold text-[18px] uppercase">Fund</h4>

              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignDetails;
