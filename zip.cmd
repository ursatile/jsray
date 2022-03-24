del examples\*.zip
cd examples
for /D %%1 in (*.*) do (
    cd %%1
    7z a -r -x!node_modules\* ..\%%1.zip *.html *.css *.js *.svg
    cd ..
)
cd ..

