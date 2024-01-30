import { PrismaClient } from '@prisma/client'

// let prismaClient;

// if (process.env.NODE_ENV === 'production') {
//   prismaClient = new PrismaClient();
// } else {
//   if (!global.prismaClient) {
//     global.prismaClient = new PrismaClient();
//   }
//   prismaClient = global.prismaClient;
// }

// export {
//   prismaClient
// };

export const prismaClient = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  })
  
  prismaClient.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')
  })