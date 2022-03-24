del *.zip
for /D %%1 in (*.*) do (    
    7z a -r -x!%%1\node_modules\* %%1.zip %%1\*.html %%1\*.css %%1\*.js %%1\*.svg
)

