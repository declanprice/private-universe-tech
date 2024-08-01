echo "starting application"

cd /var/app

rm .env.production

echo NEXTAUTH_URL=$(aws ssm get-parameter --name /private-universe-tech/auth/url --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env.production
echo NEXTAUTH_SECRET=$(aws ssm get-parameter --name /private-universe-tech/auth/secret --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env.production
echo DATABASE_URL=$(aws ssm get-parameter --name /private-universe-tech/database/connection-string --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env.production

npx pm2 start "./node_modules/next/dist/bin/next start"