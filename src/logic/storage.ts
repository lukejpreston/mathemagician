import type { Mathemagician, SpellRecord } from '../types';

const KEYS = {
  MATHEMAGICIANS: 'arcane_scrolls_magicians',
  RECORDS: 'arcane_scrolls_records',
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

export const getRecords = (mathemagicianId?: string): SpellRecord[] => {
  const data = localStorage.getItem(KEYS.RECORDS);
  const records: SpellRecord[] = data ? JSON.parse(data) : [];
  if (mathemagicianId) {
    return records.filter((r) => r.mathemagicianId === mathemagicianId);
  }
  return records;
};

export const saveRecord = (record: Omit<SpellRecord, 'id' | 'date'>): SpellRecord => {
  const records = getRecords();
  const newRecord: SpellRecord = {
    ...record,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  localStorage.setItem(KEYS.RECORDS, JSON.stringify([...records, newRecord]));
  return newRecord;
};

export const deleteMathemagician = (id: string): void => {
  const magicians = getMathemagicians().filter((m) => m.id !== id);
  localStorage.setItem(KEYS.MATHEMAGICIANS, JSON.stringify(magicians));
  
  const records = getRecords().filter((r) => r.mathemagicianId !== id);
  localStorage.setItem(KEYS.RECORDS, JSON.stringify(records));
};

export const deleteAllMathemagicians = (): void => {
  localStorage.removeItem(KEYS.MATHEMAGICIANS);
  localStorage.removeItem(KEYS.RECORDS);
};
