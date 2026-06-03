import type { Mathemagician, CampaignRecord } from '../types';

const KEYS = {
  MATHEMAGICIANS: 'arcane_drills_magicians',
  RECORDS: 'arcane_drills_records',
};

export const getMathemagicians = (): Mathemagician[] => {
  const data = localStorage.getItem(KEYS.MATHEMAGICIANS);
  return data ? JSON.parse(data) : [];
};

export const saveMathemagician = (name: string): Mathemagician => {
  const magicians = getMathemagicians();
  const newMagician: Mathemagician = {
    id: crypto.randomUUID(),
    name,
  };
  localStorage.setItem(KEYS.MATHEMAGICIANS, JSON.stringify([...magicians, newMagician]));
  return newMagician;
};

export const getRecords = (mathemagicianId?: string): CampaignRecord[] => {
  const data = localStorage.getItem(KEYS.RECORDS);
  const records: CampaignRecord[] = data ? JSON.parse(data) : [];
  if (mathemagicianId) {
    return records.filter((r) => r.mathemagicianId === mathemagicianId);
  }
  return records;
};

export const saveRecord = (record: Omit<CampaignRecord, 'id' | 'date'>): CampaignRecord => {
  const records = getRecords();
  const newRecord: CampaignRecord = {
    ...record,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  localStorage.setItem(KEYS.RECORDS, JSON.stringify([...records, newRecord]));
  return newRecord;
};
