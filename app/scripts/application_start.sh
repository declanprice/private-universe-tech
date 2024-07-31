echo "starting application"

cd /var/app

echo NEXTAUTH_URL=${props.environment.hostUrl} >> .env.production
echo NEXTAUTH_SECRET=$(aws ssm get-parameter --name ${props.environment.authSecretParamName} --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env.production
echo DATABASE_URL=$(aws ssm get-parameter --name ${props.environment.databaseParamName} --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env.production

npm run start:prod