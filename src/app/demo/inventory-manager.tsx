"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Define the shape of your value
interface ItemDetails {
  price: number;
  quantity: number;
}

// Define the initial state Map
const initialInventory = new Map<string, ItemDetails>([
  ["apple", { price: 0.5, quantity: 100 }],
  ["banana", { price: 0.3, quantity: 50 }],
]);

export default function InventoryManager() {
  // Use a Map in state. Note the generic type definition.
  const [inventory, setInventory] =
    React.useState<Map<string, ItemDetails>>(initialInventory);

  // Helper function to update the Map state
  const updateQuantity = (itemName: string, newQuantity: number) => {
    // IMPORTANT: Maps are objects. To trigger a re-render, you must create a new Map object.
    const newInventory = new Map(inventory); // 1. Create a copy of the existing Map

    if (newInventory.has(itemName)) {
      // 2. Perform the update on the copy
      const currentDetails = newInventory.get(itemName)!;
      newInventory.set(itemName, { ...currentDetails, quantity: newQuantity });
    } else {
      // Add a new item
      newInventory.set(itemName, { price: 1.0, quantity: newQuantity });
    }

    // 3. Set the new Map object to update the state
    setInventory(newInventory);
  };

  // You might want to convert it to an array for easy rendering
  const inventoryArray = React.useMemo(
    () => Array.from(inventory.entries()),
    [inventory]
  );

  return (
    <div className="flex flex-col gap-4 px-4">
      <Card>
        <h2>Inventory ({inventory.size} items)</h2>
        <CardContent className="flex flex-row gap-4">
        <Button onClick={() => updateQuantity("apple", 99)}>
          Sell Apple (Update Map)
        </Button>
        <Button onClick={() => updateQuantity("orange", 25)}>
          Add Orange (Set New Key)
        </Button>
        </CardContent>
      </Card>
      <Card>
        <ul>
          {/* Render the data by iterating over the array created from the Map */}
          {inventoryArray.map(([name, details]) => (
            <li key={name}>
              {name}: ${details.price} x {details.quantity}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
