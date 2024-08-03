echo "starting application"

cd /var/app

rm .env

echo NEXTAUTH_URL=$(aws ssm get-parameter --name /private-universe-tech/auth/url --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env
echo NEXTAUTH_SECRET=$(aws ssm get-parameter --name /private-universe-tech/auth/secret --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env
echo DATABASE_URL=$(aws ssm get-parameter --name /private-universe-tech/database/connection-string --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env

npx prisma generate

mv nginx.conf /etc/nginx

systemctl restart nginx

npx pm2 start "./node_modules/next/dist/bin/next start"

