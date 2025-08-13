"use client";

import useSWR from "swr";

export default function ProfilePage() {
  const { data } = useSWR("/api/user");
  return (
    <>
      <div className="font-bold text-2xl">Profile Page</div>
      <hr />
      {data && <div>{JSON.stringify(data)}</div>}
      
    </>
  );
}
