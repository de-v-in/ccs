import React, { useState } from "react";
import LimitSelect from "./LimitSelect";

export default function AccountSearch({ account, setAccount, fetchAccountTransfers }) {
  const [isFetchAccount, setIsFetchAccount] = useState(false);

  const handleChange = (e: any) => {
    setAccount(e.target.value);
  };

  const handleKeyDown = async (e: any) => {
    if (!isFetchAccount) {
      if (e.key === "Enter" || e.keyCode === 13) {
        setIsFetchAccount(true)
        await fetchAccountTransfers();
        setIsFetchAccount(false)
      }
    }
  };


  return (
    <div className="flex items-center flex-col">
      <div className="mt-1 mb-2 relative rounded-md shadow-md">
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full pl-7 pr-12 sm:text-3xl border-gray-300 rounded-md h-12"
          placeholder="Your account address.."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={account}
          disabled={isFetchAccount}
        />
      </div>
    </div>
  );
}
