#!/bin/bash

# If tests have an `.only` keyword, abort
badFileTest=`git diff --cached --name-only | cut  -f2 | egrep test | xargs egrep '\.only\('`
if [[ $? -eq 0 && ! -z ${badFileTest} ]]
  then
    echo 'Please remove all your `.only` from tests.'
    exit 1
fi

for file in $(git diff --cached --name-only | grep -E '\.(js|jsx)$')
do
  git show ":$file" | npx eslint --stdin --stdin-filename "$file" # we only want to lint the staged changes, not any un-staged changes
if [ $? -ne 0 ]; then
  echo "ESLint failed on staged file '$file'. Please check your code and try again. You can run ESLint manually via npm run eslint."
  exit 1 # exit with failure status
fi
done
