import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
});

export { queryClient };
