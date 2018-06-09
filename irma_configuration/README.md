Whenever anything is added or changed in any of the scheme manager contained in this folder, be sure to update the timestamp file, by executing

    date +%s | tr -d '\n' > timestamp

Otherwise the app will not copy the new or updated files out of the binary to its storage.