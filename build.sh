#! /bin/bash

download() {
    local url="$1"
    local dest="$2"
    status=$(curl -s -o "${dest}" -w '%{http_code}' "${url}")
    if [ "${status}" != 200 ]; then
        echo "Failed to download ${url}: ${status}" >&1
        return 1
    fi
}

set -eu
set -o pipefail

FILES=(
    content_scripts/autohalt.js
    content_scripts/autohalt-facebook.js
    content_scripts/autohalt-gfycat.js
    content_scripts/autohalt-twitch.js
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
(cd "${ff_build_dir}" && zip "${vname}.zip" "${FF_FILES[@]}")
mv -i "${ff_build_dir}/${vname}.zip" "artifacts/${vname}.zip"

# Chrome
echo "Chrome"
ch_build_dir="${build_dir}/chrome"
rsync -R "${CH_FILES[@]}" "${ch_build_dir}"
## Apply manifest changes for chrome
jq -f chrome.jq <manifest.json >"${ch_build_dir}/manifest.json"
CH_FILES+=(manifest.json)
## Update script configuration
sed -i.bak 's/const useSettings = true;/const useSettings = false;/g' "${ch_build_dir}/content_scripts/autohalt.js"
## Generate png icons
mkdir "${ch_build_dir}/icons/"
sizes="$(jq -r '.icons|keys[]' <"${ch_build_dir}/manifest.json")"
for p in ${sizes}; do
    convert -density 2400 -resize "${p}x${p}" -background none icons/autohalt.svg "${ch_build_dir}/icons/autohalt-${p}.png" &
    CH_FILES+=("icons/autohalt-${p}.png")
done
wait
## Package
(cd "${ch_build_dir}" && zip "${vname}-ch.zip" "${CH_FILES[@]}")
mv -i "${ch_build_dir}/${vname}-ch.zip" "artifacts/${vname}-ch.zip"

echo "Success"
