"use client";

import React, { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useProfile } from "@/hooks/useProfile";

export default function UserAddressCard() {
  const { profile, updateProfile } = useProfile();
  const { isOpen, openModal, closeModal } = useModal();

  const [form, setForm] = useState({
    billing_address: "",
    country: "",
    tax_id: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        billing_address: profile.billing_address || "",
        country: profile.country || "",
        tax_id: profile.tax_id || "",
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Address
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  Country
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {profile?.country || "-"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  Billing Address
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {profile?.billing_address || "-"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  Tax ID
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {profile?.tax_id || "-"}
                </p>
              </div>
            </div>
          </div>

          <Button onClick={openModal} size="sm">
            Edit
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Address
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your billing details if needed.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Country</Label>
                  <Input
                    name="country"
                    type="text"
                    value={form.country}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Billing Address</Label>
                  <Input
                    name="billing_address"
                    type="text"
                    value={form.billing_address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Tax ID</Label>
                  <Input
                    name="tax_id"
                    type="text"
                    value={form.tax_id}
                    onChange={handleChange}
                  />
                </div>
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
