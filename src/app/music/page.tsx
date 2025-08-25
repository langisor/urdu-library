"use client";
import { useState } from 'react';
import "./style.css";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from "@/components/ui/button";


export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <Card className='p-2'>
      {isFancy ? (
        <div className='flex gap-3'>
          <Counter name={'fancy-counter-a'} isFancy={true} />
          <Counter name={'fancy-counter-b'} isFancy={true} />
        </div>

      ) : (
        <Card>
          <div className='flex gap-3'>
            <Counter name={'counter-a'} isFancy={false} />
            <Counter name={'counter-b'} isFancy={false} />
          </div>
        </Card>
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </Card>
  );

}
function Counter({ isFancy, name }: { isFancy: boolean, name: string }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <Card className='flex gap-4'>
      <div
        className={className}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        <span className='mx-3'>{score}</span>
        <Button className='my-4' onClick={() => setScore(score + 1)}>
          Add one
        </Button>
      </div>
    </Card>
  );
}