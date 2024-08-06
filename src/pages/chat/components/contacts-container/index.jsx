import React, { useEffect } from "react";
import Logo from "../../../../components/Logo";
import Title from "@/components/Title";
import ProfileInfo from "./components/profile-info";
import NewDM from "./components/new-dm";
import { apiClient } from "@/lib/api-client";
import {
  GET_DM_CONTACTS_ROUTES,
  GET_USER_CHANNELS_ROUTE,
} from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "@/components/ContactList";
import CreateChannel from "./components/create-channel";

const ContactsContainer = () => {
  const {
    setDirectMessagesContacts,
    directMessagesContacts,
    channels,
    setChannels,
  } = useAppStore();
  useEffect(() => {
    const getContacts = async () => {
      const res = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
        withCredentials: true,
      });
      if (res.data.contacts) {
        setDirectMessagesContacts(res.data.contacts);
      }
    };
    const getChannels = async () => {
      const res = await apiClient.get(GET_USER_CHANNELS_ROUTE, {
        withCredentials: true,
      });
      if (res.data.channels) {
        setChannels(res.data.channels);
      }
    };

    getContacts();
    getChannels();
  }, [setChannels , setDirectMessagesContacts]);

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
        <div className="max-h-[38vh] overflow-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
          <CreateChannel />
        </div>
        <div className="max-h-[38vh] overflow-auto scrollbar-hidden">
          <ContactList contacts={channels} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;
