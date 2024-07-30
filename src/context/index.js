import { createContext, useState } from "react";

export const GloblaContext = createContext();

export default function GloblaState({ children }) {
  const [userDetailsModel, setUserDetailsModel] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [loaders,setLoaders]=useState(false)
  const [userPosition,setUserPOsition]=useState(null)

  return (
    <GloblaContext.Provider
      value={{
        userDetailsModel,
        setUserDetailsModel,
        imageModal,
        setImageModal,
        loaders,
        setLoaders,
        userPosition,
        setUserPOsition
      }}
    >
      {children}
    </GloblaContext.Provider>
  );
}
