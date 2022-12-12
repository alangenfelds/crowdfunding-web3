import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { CustomButton, FormField, Loader } from '../components';
import { money } from '../assets';
import { checkIfImage } from '../utils';
import { useAppContext } from '../context';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { createCampaign } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    target: '',
    deadline: '',
    image: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);

        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });

        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL!');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex flex-col justify-center items-center rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-4 sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-bold sm:text-[25px] text-lg leading-[38px]">
          Start a Campaign 🚀
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            fieldName="name"
            labelName="Your Name *"
            placeholder="Enter your name"
            inputType="text"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            fieldName="title"
            labelName="Campaign Title *"
            placeholder="Enter campaign title"
            inputType="text"
            value={form.title}
            handleChange={handleChange}
          />

          <FormField
            fieldName="description"
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={handleChange}
          />
        </div>

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-bold text-[25px] ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            fieldName="target"
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target}
            handleChange={handleChange}
          />
          <FormField
            fieldName="deadline"
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={handleChange}
          />

          <FormField
            fieldName="image"
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="text"
            value={form.image}
            handleChange={handleChange}
          />
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
