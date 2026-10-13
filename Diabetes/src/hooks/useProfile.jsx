import { useCallback, useEffect, useState } from 'react';
import initialData from '../data/profile.json';
import { readStore, writeStore, PROFILE_KEY } from '../services/storageService';

function loadProfile() {
  const stored = readStore(PROFILE_KEY);
  if (stored) return stored;
  writeStore(PROFILE_KEY, initialData.profile);
  return initialData.profile;
}

export function useProfile() {
  const [profile, setProfile] = useState(loadProfile);

  useEffect(() => {
    writeStore(PROFILE_KEY, profile);
  }, [profile]);

  const updateProfile = useCallback((changes) => {
    setProfile((prev) => ({ ...prev, ...changes }));
  }, []);

  const updateMedicalInfo = useCallback((changes) => {
    setProfile((prev) => ({
      ...prev,
      medicalInfo: { ...prev.medicalInfo, ...changes },
    }));
  }, []);

  const updateEmergencyContact = useCallback((contact) => {
    setProfile((prev) => ({ ...prev, emergencyContact: contact }));
  }, []);

  const addCareInstruction = useCallback((text) => {
    setProfile((prev) => ({
      ...prev,
      careInstructions: [...prev.careInstructions, text],
    }));
  }, []);

  const removeCareInstruction = useCallback((index) => {
    setProfile((prev) => ({
      ...prev,
      careInstructions: prev.careInstructions.filter((_, i) => i !== index),
    }));
  }, []);

  return {
    profile,
    updateProfile,
    updateMedicalInfo,
    updateEmergencyContact,
    addCareInstruction,
    removeCareInstruction,
  };
}
