import { useEffect } from 'react';

const useResetImportModalState = (
  isImportModalOpen: boolean,
  setFileName: React.Dispatch<React.SetStateAction<string | null>>,
  setJsonData: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsFileValid: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    if (!isImportModalOpen) {
      setFileName(null);
      setJsonData(null);
      setError(null);
      setIsFileValid(false);
    }
  }, [isImportModalOpen, setFileName, setJsonData, setError, setIsFileValid]);
};

export default useResetImportModalState;
