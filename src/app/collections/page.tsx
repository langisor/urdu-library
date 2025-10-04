"use client";
import * as React from "react";


type UserId=string; // user id represent map key
type HasAdminPermission=boolean  // permission status value

// map type
type UserMap=Map<UserId,HasAdminPermission>;

// '[UserId,HasAdminPermission][]' is equivalent to 'UserMap'
 
// Initial data for the map state.
const INITIAL_USERS:[UserId,HasAdminPermission][]  = [
  ['alice_42', true],
  ['bob_99', false],
  ['charlie_01', true],
];
 
export default function CollectionsPage() {
  const  [permissions, setPermissions] = React.useState<UserMap>(new Map(INITIAL_USERS));

  
  return (
    <div>
      <h1 className="text-2xl font-bold">Collections</h1>
    </div>
  );
}
