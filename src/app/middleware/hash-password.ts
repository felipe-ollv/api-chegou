import bcrypt from 'bcrypt';

export const createHash = async (data: string): Promise<string> => {
  const hash = await bcrypt.hash(data, 10);
  return hash;
}

export const compareHash = async (data: string): Promise<boolean> => {
  const value = await bcrypt.compare(data, 'hashnobanco');
  return value;
}