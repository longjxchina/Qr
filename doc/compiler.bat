@cd ../src
java -jar %jscompiler% --compilation_level SIMPLE_OPTIMIZATIONS --js js/jquery.js --js js/tooltip.js --js js/modal.js --js js/md5.js --js js/setting.js --js js/GlobalStorage.js --js js/UserConfig.js --js_output_file publish/js/base.js

@pause

java -jar %jscompiler% --compilation_level SIMPLE_OPTIMIZATIONS  --js js/Clipboard.js --js js/background.js --js_output_file publish/js/background.js

@pause

