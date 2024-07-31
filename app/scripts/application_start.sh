echo "starting application"

cd /var/app

echo NEXTAUTH_URL=$NEXTAUTH_URL >> .env.production
echo NEXTAUTH_SECRET=$(aws ssm get-parameter --name $NEXTAUTH_SECRET_PARAM --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env.production
echo DATABASE_URL=$(aws ssm get-parameter --name $DATABASE_URL_PARAM --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env.production

npx pm2 start "./node_modules/next/dist/bin/next start";