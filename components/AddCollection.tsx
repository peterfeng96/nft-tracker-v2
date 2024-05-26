"use client";
import { ReactEventHandler, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AddCollection() {
  const [userId, setUserId] = useState("") as any;
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user!.id);
    };
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  function validateAddress() {
    if (!address.startsWith("0x") || address.length !== 42) {
      setError("Please enter valid ethereum contract");
      return false;
    }
    return true;
  }

  async function checkDuplicateSubscription() {
    const { data, error } = await supabase
      .from("user_subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("contract_address", address)
      .maybeSingle();

    if (data) {
      setError("Already subscribed to this collection");
      return false;
    }
    return true;
  }

  async function addUserSubscriptions() {
    if (validateAddress() && (await checkDuplicateSubscription())) {
      let x = await supabase
        .from("user_subscriptions")
        .insert({ user_id: userId, contract_address: address });

      setError(null);
      setAddress("");
    }
  }

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => handleInputChange(e)}
      ></input>
      <button onClick={addUserSubscriptions}>random button</button>
      <div>{error ? error : null}</div>
    </div>
  );
}
