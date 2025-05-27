// dictionaryService.js
export const fetchDictionary = async (word) => {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Unable to find words');
  }
  const data = await res.json();
  return data[0]; // trả về phần tử đầu tiên
};
