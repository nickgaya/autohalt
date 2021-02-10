#! /bin/bash

abort_usage() {
    {
        if [ -n "${1:-}" ]; then echo "$1"; fi
        echo "Usage: $0 [-h] [-f|-c] [-p]"
        echo "    -h   Print this message and exit"
        echo "    -f   Build for firefox only"
        echo "    -c   Build for chrome only"
        echo "    -p   Package extension as .zip file"
    } >&2;
    exit 1
}

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

ff=1
ch=1
pkg=0
while getopts ':hfcp' opt; do
    case "$opt" in
        f)  ff=1; ch=0;;
        c)  ff=0; ch=1;;
        p)  pkg=1;;
        :)  abort_usage "-${OPTARG} requires an argument";;
        \?) abort_usage "Invalid option: -${OPTARG}";;
        *)  abort_usage;;
    esac
done
shift $((OPTIND - 1))
if [ $# -gt 0 ]; then
    abort_usage
fi

name="$(jq -r '.name|ascii_downcase' <manifest.json)"
version="$(jq -r '.version' <manifest.json)"
vname="${name}-${version}"

mkdir -p build/ artifacts/

build_dir="build/${vname}"
mkdir -p "${build_dir}"

# Firefox
if (( $ff )); then
    ff_build_dir="${build_dir}/firefox"
    echo "Firefox: Creating ${ff_build_dir}"
    rm -rf "${ff_build_dir}"
    mkdir "${ff_build_dir}"
    rsync -R "${FF_FILES[@]}" "${ff_build_dir}"
    if (( $pkg )); then
        echo "Firefox: Building artifacts/${vname}-fx.zip"
        (cd "${ff_build_dir}" && zip "${vname}-fx.zip" "${FF_FILES[@]}")
        mv -i "${ff_build_dir}/${vname}-fx.zip" "artifacts/${vname}-fx.zip"
    fi
fi

# Chrome
if (( $ch )); then
    ch_build_dir="${build_dir}/chrome"
    echo "Chrome: Creating ${ch_build_dir}"
    rm -rf "${ch_build_dir}"
    mkdir "${ch_build_dir}"
    rsync -R "${CH_FILES[@]}" "${ch_build_dir}"
    ## Apply manifest changes for chrome
    jq -f chrome.jq <manifest.json >"${ch_build_dir}/manifest.json"
    CH_FILES+=(manifest.json)
    ## Update script configuration
    sed -i.bak 's/const useSettings = true;/const useSettings = false;/g' "${ch_build_dir}/content_scripts/autohalt.js"
    if (( $pkg )); then
        echo "Chrome: Building artifacts/${vname}-ch.zip"
        (cd "${ch_build_dir}" && zip "${vname}-ch.zip" "${CH_FILES[@]}")
        mv -i "${ch_build_dir}/${vname}-ch.zip" "artifacts/${vname}-ch.zip"
    fi
fi

echo "Success"
