import { NextRequest } from 'next/server';
import { PoolOptions, RowDataPacket } from 'mysql2/promise';
import { MySQL } from '@/utils/db'
interface User extends RowDataPacket {
    id: number;
    name: string;
}
const access: PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};


(async () => {
  const mysql = new MySQL(access);

  /** Getting users */
  const [users] = await mysql.queryRows(
    'SELECT * FROM `project` ORDER BY `id` ASC;'
  );

 console.log(users);

  await mysql.connection.end();
})();
// export async function GET(request: NextRequest) {

//     const mysql = new MySQL(access);
//     const [users] = await mysql.queryRows(
//         'SELECT * FROM `projects` ORDER BY `id` ASC;'
//     );

//     return new Response(JSON.stringify(users), {
//         headers: { 'Content-Type': 'application/json' },
//     });
    
//     await mysql.connection.end();

// }
// export async function GET(request: NextRequest) {
//     const searchParams = request.nextUrl.searchParams
//     const query = searchParams.get('query')
  
//     const raw = JSON.stringify({"propertyName": query});
  
//     const response = await fetch(
//       "https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=1&pageSize=100",
//       {
//         method: "POST",
//         headers:{
//             'accept':'*/*',
//             'Content-Type':'application/json',
//             'apiKey':'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
//         },
//         body: raw,
//       }
//     );
  
//     if (!response.ok) {
//       const error = new Error("An error occurred while fetching projects");
//       throw error;
//     }
  
//     const projects = await response.json();
//     //setLoading(false);
//     //return projects;
 
//   return new Response(JSON.stringify(projects), {
//     headers: { 'Content-Type': 'application/json' },
//   });
// }