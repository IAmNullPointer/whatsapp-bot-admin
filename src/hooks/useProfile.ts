import { useEffect, useState } from "react";
import axios from "@/lib/api"; // adjust based on your setup

export interface UserProfile {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  business_name?: string;
  billing_address?: string;
  tax_id?: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get<UserProfile>("/user/me");
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      console.log("Updating profile with:", updates);
      const res = await axios.put<UserProfile>("/user/me", updates);
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, updateProfile };
}
