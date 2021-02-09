#! /bin/bash

set -eu
set -o pipefail

FILES=(
    content_scripts/autohalt.js
    content_scripts/autohalt-facebook.js
    content_scripts/autohalt-gfycat.js
    content_scripts/autohalt-hulu.js
    content_scripts/autohalt-twitch.js
    content_scripts/autohalt-vimeo.js
    content_scripts/autohalt-youtube.js
)
FF_FILES=(
    "${FILES[@]}"
    manifest.json
    icons/autohalt.svg
    settings/settings.html
    settings/settings.js
)
CH_FILES=(
    "${FILES[@]}"
    icons/autohalt-16.png
    icons/autohalt-48.png
    icons/autohalt-128.png
)

name="$(jq -r '.name|ascii_downcase' <manifest.json)"
version="$(jq -r '.version' <manifest.json)"
vname="${name}-${version}"

mkdir -p build/ artifacts/

build_dir="build/${vname}"
rm -rf "${build_dir}"
mkdir "${build_dir}"

# Firefox
echo "Firefox"
ff_build_dir="${build_dir}/firefox"
rsync -R "${FF_FILES[@]}" "${ff_build_dir}"
(cd "${ff_build_dir}" && zip "${vname}-fx.zip" "${FF_FILES[@]}")
mv -i "${ff_build_dir}/${vname}-fx.zip" "artifacts/${vname}-fx.zip"

# Chrome
echo "Chrome"
ch_build_dir="${build_dir}/chrome"
rsync -R "${CH_FILES[@]}" "${ch_build_dir}"
## Apply manifest changes for chrome
jq -f chrome.jq <manifest.json >"${ch_build_dir}/manifest.json"
CH_FILES+=(manifest.json)
## Update script configuration
sed -i.bak 's/const useSettings = true;/const useSettings = false;/g' "${ch_build_dir}/content_scripts/autohalt.js"
## Package
(cd "${ch_build_dir}" && zip "${vname}-ch.zip" "${CH_FILES[@]}")
mv -i "${ch_build_dir}/${vname}-ch.zip" "artifacts/${vname}-ch.zip"

echo "Success"
