# `https://langisor-app.netlify.app/api/v2/`  `API` Documentation

This document contains a compilation of all `.ts` files found in the project.

---

## File: /q/route.ts

```ts
import { queryClient } from "@/server/postgres-client";
import { NextResponse } from "next/server";

export async function GET() {
 const data = await queryClient`
    select * from "Quiz" order by "id" asc limit 10;
  `;
 const count = await queryClient`
    select count(*) from "Quiz";
  `;
 return NextResponse.json({
  status: 200,
  count: count[0].count,
  data: data,
 });
}
```

---

## File: /q/[...id]/route.ts

```ts
import { prismaClient } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);

  const data = await prismaClient.quiz.findUnique({
    where: {
      id,
    },
  });
  return NextResponse.json(data?.quizData || null);
}
```

---

## File: /l/[id]/q/route.ts

```ts
import { queryClient } from "@/server/postgres-client";
import { type NextRequest, NextResponse } from "next/server";
export async function GET(
 req: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
 const id = (await params).id;
 console.log("id", id);

 const data = await queryClient`
   select * from "Quiz" where "lessonID" = ${Number(id)} order by "id" asc;
 `;
 // console.log("data", data);
 const quizzesAsJson = [];
 for (let i = 0; i < data.length; i++) {
  const quiz = data[i].quizData;
  
  quizzesAsJson.push(quiz);
 }
 return NextResponse.json(quizzesAsJson);
}
```

---

## File: /l/[id]/route.ts

```ts
import { NextResponse, type NextRequest } from "next/server";
import { prismaClient } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const id = (await params).id;
  // console.log("id", id);
  const data = await prismaClient.lesson.findUnique({
    where: {
      id: Number(id),
    },
  });
  return NextResponse.json(data);
}
```

---

## File: /l/route.ts

```ts
import { queryClient } from "@/server/postgres-client";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
 const data = await queryClient`
  select * from "Lesson" order by "id" asc;
 `;
 return NextResponse.json(data);
}
```

---

## File: /v/route.ts

```ts
import { queryClient } from "@/server/postgres-client";
import { NextResponse } from "next/server";

export async function GET() {
 const data = await queryClient`
    select * from "Vocabulary" order by "id" asc limit 10;



  `;
 const count = await queryClient`
    select count(*) from "Vocabulary";
  `;
 return NextResponse.json({
  status: 200,
  count: count[0].count,
  data: data,
 });
}
```

---

## File: /v/[...id]/route.ts

```ts
import { prismaClient } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
 req: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
 const id = Number((await params).id);

 const data = await prismaClient.vocabulary.findUnique({
  where: {
   id,
  },
 });
 return NextResponse.json(data);
}
```

---

## File: /c/[id]/route.ts

```ts
import { NextResponse, type NextRequest } from "next/server";
import { prismaClient } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const id = (await params).id;
  // console.log("id", id);
  const data = await prismaClient.category.findUnique({
    where: {
      id: Number(id),
    },
  });
  return NextResponse.json(data);
}
```

---

## File: /c/route.ts

```ts
import { queryClient } from "@/server/postgres-client";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  const data = await queryClient`
  select * from "Category" order by "id" asc;
 `;
  return NextResponse.json(data);
}
```
