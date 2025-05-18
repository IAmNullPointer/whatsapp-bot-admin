"use client";

import React, { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Image from "next/image";
import { useProfile } from "@/hooks/useProfile";

export default function UserMetaCard() {
  const { profile, updateProfile } = useProfile();
  const { isOpen, openModal, closeModal } = useModal();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    business_name: "",
    country: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        business_name: profile.business_name || "",
        country: profile.country || "",
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    await updateProfile(form);
    closeModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold text-xl dark:bg-gray-700 dark:text-white">
  {profile?.first_name?.[0]}{profile?.last_name?.[0]}
</div>
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {profile?.first_name || ""} {profile?.last_name || ""}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profile?.business_name || "-"}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profile?.country || "-"}
                </p>
              </div>
            </div>
            <div className="flex items-center order-2 grow xl:order-3 xl:justify-end">
              <Button onClick={openModal} size="sm">
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Profile Header Info
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Business-facing identity and location.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 px-2 pb-3">
              <div>
                <Label>First Name</Label>
                <Input
                  name="first_name"
                  type="text"
                  value={form.first_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  name="last_name"
                  type="text"
                  value={form.last_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Business Name</Label>
                <Input
                  name="business_name"
                  type="text"
                  value={form.business_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  name="country"
                  type="text"
                  value={form.country}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
