# Exit on error
set -e

architecture=$2
if [[ $2 == "x86_64" ]]
then
  architecture=""
else 
  architecture="--arm64"
fi

cargo lambda build --release $architecture
cp -r ./target/lambda/app/ $1