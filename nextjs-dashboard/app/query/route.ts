import postgres from 'postgres';

// Initialize the Postgres connection using the secure URL from your .env file
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// SQL query function to test the seeded data
async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

export async function GET() {
  // REMOVE the temporary message block:
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });

  try {
    // Execute the query and return the result as JSON
    return Response.json(await listInvoices());
  } catch (error) {
    // Handle any connection or query errors
    return Response.json({ error }, { status: 500 });
  }
}