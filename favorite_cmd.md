# Heroku
<!-- rotate db credentials -->
heroku pg:credentials:rotate DATABASE -a blabla-19-90
<!-- local test -->
npm run build
heroku local web
<!-- set and get heroku git branch -->
heroku git:remote -a blabla-19-90
git remote -v
<!-- push on heroku remote branch -->
git push heroku main
<!-- Logs -->
heroku logs --tail
<!-- Stop app -->
heroku ps:scale web=0
heroku ps:scale web=1


# Prisma
<!-- Format schema.prisma file -->
npx prisma format
<!-- Update postgre DB schemas -->
npx prisma db push
<!-- Generate @prisma/client types -->
npx prisma generate

