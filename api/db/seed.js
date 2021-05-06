/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

async function main() {
  // https://www.prisma.io/docs/guides/prisma-guides/seed-database
  // Seed data is database data that needs to exist for your app to run.
  // Ideally this file should be idempotent: running it multiple times
  // will result in the same database state (usually by checking for the
  // existence of a record before trying to create it). For example:
  /*
    const result = await db.user.createMany({
      data: [
        { email: "alice@example.com" },
        { email: "mark@example.com" },
        { email: "jackie@example.com" },
        { email: "bob@example.com" },
      ],
      skipDuplicates: true, // Supported with Postgres database
    })
    console.log(`Created ${result.count} users!`)
  */
  // Note: createMany creates multiple records in a transaction.
  // To enable this feature, add createMany to previewFeatures in your schema.
  // See: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany-preview
  // Note: createMany is not supported by SQLite.
  //
  // Example without createMany (supported by all databases):
  /*
    const existing = await db.user.findMany({ where: { email: 'admin@email.com' }})
    if (!existing.length) {
      await db.user.create({ data: { name: 'Admin', email: 'admin@email.com' }})
    }
  */

  const postData = [
    {
      title: 'Example Post 1',
      body: 'Elit eu incididunt sit esse proident quis et aliqua officia esse anim id ut dolor eu in do non irure ad quis magna eiusmod duis sint ea eiusmod magna proident sint ut do elit ea enim.',
    },
    {
      title: 'Example Post 2',
      body: 'Sed qui irure do nostrud consectetur mollit qui nulla elit exercitation aute esse ut occaecat esse officia ut deserunt anim cillum anim sint esse dolore mollit id veniam ex aute reprehenderit adipisicing voluptate ut do sint amet duis tempor voluptate laboris minim ea dolore id cillum consectetur magna voluptate in non qui commodo deserunt in laboris velit fugiat id dolore dolor magna nulla nostrud consequat cillum consectetur enim et commodo adipisicing ea amet enim labore culpa cillum irure duis proident commodo sint pariatur quis exercitation in ex cupidatat dolor commodo eiusmod sed nulla eiusmod non pariatur sed laboris quis nostrud deserunt officia cillum officia ut ea dolore in officia mollit quis ut commodo dolor amet reprehenderit dolore aute qui laborum in voluptate exercitation aute fugiat officia aliqua elit qui ut velit labore in consectetur dolore ut dolore sunt aliquip dolore in amet mollit ex irure dolor est ut aliqua sit dolore mollit ad dolor irure eiusmod in exercitation deserunt qui in eu cillum velit labore qui est in laboris ullamco nisi ea officia laborum ut occaecat qui ea voluptate irure est duis id aliquip voluptate in fugiat in aliquip in duis anim adipisicing fugiat dolor aliquip ex consequat aute occaecat eu aliquip tempor quis nulla aliqua esse duis esse laboris dolore dolore mollit deserunt eiusmod ea nisi dolore dolore in exercitation nostrud non ut dolore est consectetur ad esse non qui id officia sunt ut reprehenderit eu enim eu laboris do incididunt voluptate.',
    },
  ]

  const posts = []

  for (const post of postData) {
    console.log(`Creating ${post.title}...`)
    posts.push(
      await db.post.create({
        data: post,
      })
    )
  }

  console.info(`Seeded ${postData.length} Posts`)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
